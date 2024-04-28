import { useState } from "react";


function TaskItem({ task, toggleTaskCompleted, updateTask,deleteTask  }) {
 
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);
 const [completed,setCompleted] = useState(task.completed)
  
 const handleSave = () => {
    const updatedTask = {
      ...task,
      title,
      description,
      priority,
      dueDate,
      completed
    };
    updateTask(updatedTask);
    setEditMode(false); // Exit edit mode after saving changes
  };

  const handleTaskDone = () => {
    const newCompletedStatus = !completed
    setCompleted(newCompletedStatus)
    updateTask({...task, completed: newCompletedStatus});
  }
  

  if (editMode) {
    return (
      <div className={`task-item ${editMode ? 'edit-mode' : ''}`}>
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
      <div className="task-checkbox-title">
      <input
        type="checkbox"
        checked={completed}
        onChange={handleTaskDone}
      />
      
      {title}
      </div>
     
      
    
     <div className="editDelete">
     <button onClick={() => setEditMode(true)} className="edit-button">Edit</button>
      <button onClick={deleteTask} className="delete-task-button">
        Delete
      </button>
     </div>
      
    </div>
  );
}



  export default TaskItem