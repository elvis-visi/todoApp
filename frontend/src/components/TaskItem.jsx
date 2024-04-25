import { useState } from "react";


function TaskItem({ task, toggleTaskCompleted, updateTask,deleteTask  }) {
 
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);
 const {completed} = task
  
 const handleSave = () => {
    const updatedTask = {
      ...task,
      title,
      description,
      priority,
      dueDate
    };
    updateTask(updatedTask);
    setEditMode(false); // Exit edit mode after saving changes
  };

  

  if (editMode) {
    return (
      <div className="task-item">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setEditMode(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div className="task-item">
       <button
        onClick={toggleTaskCompleted}
        disabled={completed}
      >Done</button>
      
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Priority: {priority}</p>
      <p>Due by: {new Date(dueDate).toLocaleDateString()}</p>
      <button onClick={() => setEditMode(true)}>Edit</button>
      <button onClick={deleteTask} className="delete-task-button">
        Delete
      </button>
    </div>
  );
}



  export default TaskItem