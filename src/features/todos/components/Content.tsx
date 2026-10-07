import type { Task } from "../types/task";

interface ContentProps {
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
}

export default function Content({
  totalTasks,
  pendingTasks,
  completedTasks,
}: ContentProps) {
  return (
    <section className="welcome-section">
      <div>
        <span className="eyebrow">BẢNG CÔNG VIỆC CỦA BẠN</span>
        <h1 className="welcome-title">Xin chào, hôm nay nhé!</h1>
        <p className="welcome-subtitle">
          Sắp xếp công việc và dành thời gian cho điều quan trọng.
        </p>
      </div>

      <div className="summary-card" aria-label="Tổng quan công việc">
        <span className="summary-icon" aria-hidden="true">
          ✓
        </span>
        <span>
          <span className="summary-number">
            {completedTasks}
            <span className="text-secondary fw-normal"> / {totalTasks}</span>
          </span>
          <span className="summary-label">
            {pendingTasks === 0 ? "Đã hoàn thành" : "Công việc đã xong"}
          </span>
        </span>
      </div>
    </section>
  );
}
