"use client";

import Header from "@/components/Header";
import { useTasks, Content, InputTask, TaskList } from "@/features/todos";

export default function Home() {
  const {
    tasks,
    pendingTasks,
    completedTasks,
    loading,
    error,
    addTask,
    toggleTask,
    removeTask,
    clearError,
  } = useTasks();

  return (
    <div className="app-shell">
      <Header />

      <main className="container app-container">
        <Content
          totalTasks={tasks.length}
          pendingTasks={pendingTasks.length}
          completedTasks={completedTasks.length}
        />

        <section className="composer-card" aria-label="Thêm công việc">
          <div className="composer-copy">
            <span className="eyebrow">BẮT ĐẦU NGAY</span>
            <h2>Việc gì đang ở trong đầu bạn?</h2>
            <p>Ghi lại để tập trung vào điều quan trọng tiếp theo.</p>
          </div>
          <InputTask onAddTask={addTask} disabled={loading} />
        </section>

        {error && (
          <div className="alert alert-danger app-alert" role="alert">
            <span>{error}</span>
            <button
              className="alert-close"
              type="button"
              aria-label="Đóng thông báo"
              onClick={clearError}
            >
              ×
            </button>
          </div>
        )}

        <div className="task-columns">
          <TaskList
            title="Cần hoàn thành"
            subtitle="Từng bước một, bạn sẽ làm được."
            tasks={pendingTasks}
            emptyMessage="Bạn đã hoàn thành mọi việc. Tuyệt vời!"
            onToggle={toggleTask}
            onDelete={removeTask}
          />
          <TaskList
            title="Đã hoàn thành"
            subtitle="Nhìn lại những gì bạn đã làm được."
            tasks={completedTasks}
            emptyMessage="Các công việc đã xong sẽ xuất hiện ở đây."
            onToggle={toggleTask}
            onDelete={removeTask}
          />
        </div>

        {loading && (
          <div className="loading-indicator" role="status">
            <span className="spinner-border spinner-border-sm" aria-hidden="true" />
            <span>Đang cập nhật...</span>
          </div>
        )}

        <footer className="app-footer">
          <span>Chậm mà chắc, mỗi ngày một chút.</span>
          <span>{tasks.length} công việc trong danh sách</span>
        </footer>
      </main>
    </div>
  );
}
