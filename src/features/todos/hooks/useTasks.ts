import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as todoApi from "../api/todoApi";
import type { Task } from "../types/task";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function loadTasks() {
      setLoading(true);
      setError("");

      try {
        const data = await todoApi.getTasks();
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
      const createdTask = await todoApi.createTask(title);
      setTasks((prev) => [createdTask, ...prev]);
    } catch (createError) {
      setError(getErrorMessage(createError, "Không thể thêm công việc."));
    } finally {
      setLoading(false);
    }
  }

  async function toggleTask(id: number) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    setError("");
    setLoading(true);

    try {
      const updatedTask = await todoApi.updateTask(id, !task.completed);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updatedTask : t)),
      );
    } catch (updateError) {
      setError(getErrorMessage(updateError, "Không thể cập nhật công việc."));
    } finally {
      setLoading(false);
    }
  }

  async function removeTask(id: number) {
    setError("");
    setLoading(true);

    try {
      await todoApi.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (deleteError) {
      setError(getErrorMessage(deleteError, "Không thể xóa công việc."));
    } finally {
      setLoading(false);
    }
  }

  function clearError() {
    setError("");
  }

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return {
    tasks,
    pendingTasks,
    completedTasks,
    loading,
    error,
    addTask,
    toggleTask,
    removeTask,
    clearError,
  };
}
