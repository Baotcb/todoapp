"use client";
import React from "react";
import { useState } from "react";
interface AddTask {
    onAddTask: (title: string) => void;
}


export default function InputTask({ onAddTask }: AddTask) {
    const [title, setTitle] = useState("");
    function handleSubmit() {
        if (title.trim() !== "") {
            onAddTask(title);
            setTitle("");
        }
    }
    function handlePressEnter(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            handleSubmit();
        }
    }

    return (
        <div className="add-task" style={{ marginLeft: '340px ' }}>
            <span className="add-icon">+</span>

            <input
                type="text"
                placeholder="Add a task" className="task-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handlePressEnter}
            />

            <button onClick={handleSubmit} >
                ➡️
            </button>
        </div>
    )

}