import type { Task, TaskListProps } from "../types/task";
import TaskItem from "./TaskItem";



export default function TaskList({
  title,
  subtitle,
  tasks,
  emptyMessage,
  isTaskBusy,
  onToggle,
  onDelete,
}: TaskListProps) {
  return (
    <section className="task-list">
      <div className="task-list-header">
        <div>
          <h2 className="task-list-title">{title}</h2>
          <p className="task-list-subtitle">{subtitle}</p>
        </div>
        <span className="task-count" aria-label={`${tasks.length} công việc`}>
          {tasks.length}
        </span>
      </div>

      {tasks.length > 0 ? (
        <div className="task-items">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              completed={task.completed}
              disabled={isTaskBusy ? isTaskBusy(task.id) : false}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-state-icon" aria-hidden="true">
            ✓
          </span>
          <span>{emptyMessage}</span>
        </div>
      )}
    </section>
  );
}
