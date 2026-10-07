import type { Task } from "../types/task";

interface TaskItemProps {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({
  id,
  title,
  completed,
  onToggle,
  onDelete,
}: TaskItemProps) {
  return (
    <div className="task-item">
      <input
        className="task-checkbox"
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        aria-label={`Đánh dấu "${title}" ${completed ? "chưa hoàn thành" : "đã hoàn thành"}`}
      />
      <span className={`task-title${completed ? " is-completed" : ""}`}>
        {title}
      </span>
      <button
        className="delete-button"
        type="button"
        onClick={() => onDelete(id)}
        aria-label={`Xóa công việc "${title}"`}
        title="Xóa công việc"
      >
        ×
      </button>
    </div>
  );
}
