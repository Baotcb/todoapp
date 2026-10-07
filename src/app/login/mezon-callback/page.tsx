"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MezonSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    localStorage.setItem("access_token", token);

    router.replace("/");
  }, [router]);

  return <p>Đang đăng nhập...</p>;
}
