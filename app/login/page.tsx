"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

interface LoginResponse {
  token?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Vui lòng nhập email và mật khẩu.");
      return;
    }

    try {
      setLoading(true);
      const data = await apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (!data.token) {
        throw new Error("Phản hồi đăng nhập không có token.");
      }

      localStorage.setItem("access_token", data.token);
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

  return (
    <main className="login-shell">
      <section className="login-card">
        <div className="login-brand">
          <Link className="brand-link" href="/">
            <span className="brand-mark" aria-hidden="true">
              ✓
            </span>
            <span>Taskflow</span>
          </Link>
        </div>

        <h1 className="login-heading">Chào mừng trở lại</h1>
        <p className="login-description">
          Đăng nhập để tiếp tục quản lý công việc của bạn.
        </p>

        <form onSubmit={handleLogin}>
          <div className="login-field">
            <label className="login-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-control login-input"
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="password">
              Mật khẩu
            </label>
            <input
              className="form-control login-input"
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Nhập mật khẩu của bạn"
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          <button className="login-submit" type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <Link className="login-back" href="/">
          ← Quay lại danh sách công việc
        </Link>
      </section>
    </main>
  );
}
