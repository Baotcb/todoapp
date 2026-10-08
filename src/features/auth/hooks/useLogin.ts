"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getMezonLoginUrl, login } from "@/features/auth/api/authApi";
import { setCookie } from "@/utils/cookie";

export function useLogin(reason?: string) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    reason === "session-expired"
      ? "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."
      : "",
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reason) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete("reason");
      window.history.replaceState(
        null,
        "",
        `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`,
      );
    }
  }, [reason]);

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) {
      setError("Vui lòng nhập email và mật khẩu.");
      return;
    }

    try {
      setLoading(true);
      const data = await login(normalizedEmail, password);

      if (!data.token) {
        throw new Error("Phản hồi đăng nhập không có token.");
      }

      setCookie("access_token", data.token, 1);
      router.push("/");
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Đăng nhập thất bại. Vui lòng thử lại.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleMezonLogin() {
    try {
      window.location.href = getMezonLoginUrl();
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Không thể bắt đầu đăng nhập với Mezon.",
      );
    }
  }

  return {
    email,
    password,
    error,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleMezonLogin,
  };
}