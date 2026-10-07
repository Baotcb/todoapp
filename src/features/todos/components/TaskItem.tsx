import type { TaskItemProps } from "../types/task";



export default function TaskItem({
  id,
  title,
  completed,
  disabled = false,
  onToggle,
  onDelete,
}: TaskItemProps) {
  return (
    <div className="task-item">
      <input
        className="task-checkbox"
        type="checkbox"
        checked={completed}
        disabled={disabled}
        onChange={() => onToggle(id)}
        aria-label={`Đánh dấu "${title}" ${completed ? "chưa hoàn thành" : "đã hoàn thành"}`}
      />
      <span className={`task-title${completed ? " is-completed" : ""}`}>
        {title}
      </span>
      <button
        className="delete-button"
        type="button"
        disabled={disabled}
        onClick={() => onDelete(id)}
        aria-label={`Xóa công việc "${title}"`}
        title="Xóa công việc"
      >
        ×
      </button>
    </div>
  );
}
