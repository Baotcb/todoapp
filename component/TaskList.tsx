import TaskItem from "./TaskItem";

interface Task {
    id: number;
    title: string;
    completed: boolean;


}

interface TaskListArr {
    title: string;
    tasks: Task[];

    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function TaskList({
    title,
    tasks,
    onToggle,
    onDelete
}: TaskListArr) {
    return (
        <section className="task-list">

            <h2 className="text-center">{title}</h2>

            <div>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        completed={task.completed}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))}
            </div>

        </section>
    );
}