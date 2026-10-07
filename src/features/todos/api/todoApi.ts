import { apiFetch } from "@/lib/api";
import type { Task } from "../types/task";

export async function getTasks(): Promise<Task[]> {
  return apiFetch<Task[]>("/todo");
}

export async function createTask(title: string): Promise<Task> {
  return apiFetch<Task>("/todo", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export async function updateTask(id: number, completed: boolean): Promise<Task> {
  return apiFetch<Task>(`/todo/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ completed }),
  });
}

export async function deleteTask(id: number): Promise<void> {
  return apiFetch(`/todo/${id}`, { method: "DELETE" });
}
