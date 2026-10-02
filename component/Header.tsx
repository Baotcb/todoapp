import Link from "next/link";

export default function Header() {
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
        </div>
      </div>
    </header>
  );
}
