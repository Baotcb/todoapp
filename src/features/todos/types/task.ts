export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface TaskItemProps {
  id: number;
  title: string;
  completed: boolean;
  disabled?: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface TaskListProps {
  title: string;
  subtitle: string;
  tasks: Task[];
  emptyMessage: string;
  isTaskBusy?: (id: number) => boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface InputTaskProps {
  onAddTask: (title: string) => boolean | void | Promise<void>;
  disabled?: boolean;
}

