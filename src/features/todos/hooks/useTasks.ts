import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as todoApi from "../api/todoApi";
import type { Task } from "../types/task";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}


export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [busyTaskIds, setBusyTaskIds] = useState<number[]>([]);
  const [error, setError] = useState("");

  const isTaskBusy = (id: number) => busyTaskIds.includes(id);

  const router = useRouter();

  useEffect(() => {
    async function loadTasks() {
      setIsInitialLoading(true);
      setError("");

      try {
        const data = await todoApi.getTasks();
        setTasks(data);
      } catch (loadError) {
        setError(getErrorMessage(loadError, "Không thể tải danh sách công việc."));
      } finally {
        setIsInitialLoading(false);
      }
    }

    void loadTasks();
  }, [router]);

  async function addTask(title: string): Promise<boolean> {
    setError("");
    setIsAdding(true);

    try {
      const createdTask = await todoApi.createTask(title);
      setTasks((prev) => [createdTask, ...prev]);
      return true;
    } catch (createError) {
      setError(getErrorMessage(createError, "Không thể thêm công việc."));
      return false;
    } finally {
      setIsAdding(false);
    }

  }

  async function toggleTask(id: number) {
    if (busyTaskIds.includes(id)) return;

    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    setError("");
    setBusyTaskIds((prev) => [...prev, id]);

    try {
      const updatedTask = await todoApi.updateTask(id, !task.completed);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updatedTask : t)),
      );
    } catch (updateError) {
      setError(getErrorMessage(updateError, "Không thể cập nhật công việc."));
    } finally {
      setBusyTaskIds((prev) => prev.filter((taskId) => taskId !== id));
    }
  }

  async function removeTask(id: number) {
    if (busyTaskIds.includes(id)) return;
    setError("");
    setBusyTaskIds((prev) => [...prev, id]);

    try {
      await todoApi.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (deleteError) {
      setError(getErrorMessage(deleteError, "Không thể xóa công việc."));
    } finally {
      setBusyTaskIds((prev) => prev.filter((taskId) => taskId !== id));
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
    isInitialLoading,
    isAdding,
    isTaskBusy,
    error,
    addTask,
    toggleTask,
    removeTask,
    clearError,
  };
}
