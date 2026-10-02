"use client";

import { useEffect, useState } from "react";
import Content from "@/component/Content";
import Header from "@/component/Header";
import InputTask from "@/component/InputTask";
import TaskList from "@/component/TaskList";
import { apiFetch } from "@/lib/api";
import router from "next/router";
import { useRouter } from "next/navigation";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    async function loadTasks() {
      setLoading(true);
      setError("");

      try {
        const data = await apiFetch<Task[]>("/todo");
        setTasks(data);
      } catch (loadError) {
        setError(getErrorMessage(loadError, "Không thể tải danh sách công việc."));
      } finally {
        setLoading(false);
      }
    }

    void loadTasks();
  }, [router]);

  async function addTask(title: string) {
    setError("");
    setLoading(true);

    try {
      const createdTask = await apiFetch<Task>("/todo", {
        method: "POST",
        body: JSON.stringify({ title }),
      });
      setTasks((currentTasks) => [createdTask, ...currentTasks]);
    } catch (createError) {
      setError(getErrorMessage(createError, "Không thể thêm công việc."));
    } finally {
      setLoading(false);
    }
  }

  async function toggleTask(id: number) {
    const task = tasks.find((currentTask) => currentTask.id === id);
    if (!task) return;

    setError("");
    setLoading(true);

    try {
      const updatedTask = await apiFetch<Task>(`/todo/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !task.completed }),
      });

      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === id ? updatedTask : currentTask,
        ),
      );
    } catch (updateError) {
      setError(getErrorMessage(updateError, "Không thể cập nhật công việc."));
    } finally {
      setLoading(false);
    }
  }

  async function deleteTask(id: number) {
    setError("");
    setLoading(true);

    try {
      await apiFetch(`/todo/${id}`, { method: "DELETE" });
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id),
      );
    } catch (deleteError) {
      setError(getErrorMessage(deleteError, "Không thể xóa công việc."));
    } finally {
      setLoading(false);
    }
  }

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

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
              onClick={() => setError("")}
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
            onDelete={deleteTask}
          />
          <TaskList
            title="Đã hoàn thành"
            subtitle="Nhìn lại những gì bạn đã làm được."
            tasks={completedTasks}
            emptyMessage="Các công việc đã xong sẽ xuất hiện ở đây."
            onToggle={toggleTask}
            onDelete={deleteTask}
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
