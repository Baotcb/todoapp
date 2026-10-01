interface TaskItemProps {
    id: number;
    title: string;
    completed: boolean;

    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}
export default function TaskItem({ id, title, completed, onToggle, onDelete }: TaskItemProps) {
    return (
        <div className="task-item" style={{ margin: '30px auto' }}>
            <input type="checkbox" checked={completed} onChange={() => onToggle(id)} />
            <span className={completed ? "completed" : ""} >
                {title}
            </span>
            <button className="delete-button" onClick={() => onDelete(id)}> X </button>
        </div>
    );
}