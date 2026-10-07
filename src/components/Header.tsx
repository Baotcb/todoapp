"use client";

import { deleteCookie } from "@/utils/cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  function handleLogout() {
    deleteCookie("access_token");
    router.replace("/login");
  }

  return (
    <header className="app-header">
      <div className="container app-navbar d-flex align-items-center justify-content-between">
        <Link className="brand-link" href="/">
          <span className="brand-mark" aria-hidden="true">
            ✓
          </span>
          <span>Taskflow</span>
        </Link>

        <div className="d-flex align-items-center gap-3">
          <span className="nav-caption">Không gian làm việc của bạn</span>
          <span className="nav-avatar" aria-label="Tài khoản của bạn">
            TF
          </span>
          <button
            className="logout-button"
            type="button"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
}
