"use client";
import Image from "next/image";
import Header from "../component/Header";
import Content from "../component/Content";
import InputTask from "@/component/InputTask";
import Task from "@/component/TaskList";
import TaskItem from "@/component/TaskItem";
import TaskList from "@/component/TaskList";
import { useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  function addTask(title: string) {

    const newTask: Task = {
      id: Date.now(),
      title: title,
      completed: false
    };

    setTasks(prevTasks => [
      ...prevTasks,
      newTask
    ]);
  }
  function toggleTask(id: number) {

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? {
            ...task,
            completed: !task.completed
          }
          : task
      )
    );
  }

  function deleteTask(id: number) {

    setTasks(prevTasks =>
      prevTasks.filter(task => task.id !== id)
    );
  }
  return (
    <main>
      <Header />
      <Content />
      <InputTask onAddTask={addTask} />

      <TaskList title="To Do" tasks={tasks.filter(task => !task.completed)} onToggle={toggleTask}
        onDelete={deleteTask} />

      <TaskList title="Completed" tasks={tasks.filter(task => task.completed)} onToggle={toggleTask}
        onDelete={deleteTask} />
    </main>
  );
}
