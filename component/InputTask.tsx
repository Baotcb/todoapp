"use client";

import { useState, type FormEvent } from "react";

interface InputTaskProps {
  onAddTask: (title: string) => void | Promise<void>;
  disabled?: boolean;
}

export default function InputTask({
  onAddTask,
  disabled = false,
}: InputTaskProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle || disabled) return;

    void onAddTask(trimmedTitle);
    setTitle("");
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
