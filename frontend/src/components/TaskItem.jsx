function TaskItem({ title, description, dueDate, priority }) {
    return (
      <div className="task-item">
        <input type="checkbox" disabled />
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Due by: {new Date(dueDate).toLocaleDateString()}</p>
        <p>Priority: {priority}</p>
        {/* More task details */}
      </div>
    );
  }


  export default TaskItem