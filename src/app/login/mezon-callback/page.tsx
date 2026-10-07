"use client";

import { setCookie } from "@/utils/cookie";
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

    setCookie("access_token", token, 1);

    router.replace("/");
  }, [router]);

  return <p>Đang đăng nhập...</p>;
}
