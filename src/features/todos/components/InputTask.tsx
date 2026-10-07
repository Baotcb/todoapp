"use client";

import { useState, type FormEvent } from "react";
import { InputTaskProps } from "../types/task";

export default function InputTask({
  onAddTask,
  disabled = false,
}: InputTaskProps) {
  const [title, setTitle] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle || disabled) return;
    const isSuccess = await onAddTask(trimmedTitle);
    if (isSuccess) {
      setTitle("");
    }
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <span className="add-task-symbol" aria-hidden="true">
        +
      </span>
      <input
        className="task-input"
        type="text"
        placeholder="Ví dụ: Hoàn thành báo cáo..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        aria-label="Tên công việc mới"
        maxLength={200}
      />
      <button
        className="add-task-button"
        type="submit"
        disabled={disabled || !title.trim()}
      >
        Thêm việc
      </button>
    </form>
  );
}
