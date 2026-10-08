"use client";

import Link from "next/link";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { LoginFormProps } from "@/features/auth/types/Login";



export function LoginForm({ reason }: LoginFormProps) {
  const {
    email,
    password,
    error,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleMezonLogin,
  } = useLogin(reason);

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

        <form onSubmit={handleSubmit}>
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
              onChange={handleEmailChange}
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
              onChange={handlePasswordChange}
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

        <div className="login-divider">
          <span>Hoặc đăng nhập với</span>
        </div>
        <button
          className="btn btn-outline-secondary w-100 mezon-login-button"
          type="button"
          onClick={handleMezonLogin}
        >
          <span>Tiếp tục với Mezon</span>
        </button>

        <Link className="login-back" href="/">
          ← Quay lại danh sách công việc
        </Link>
      </section>
    </main>
  );
}