import { useState } from "react";
import TaskDetails from './TaskDetails';
import TaskActions from "./TaskActions";

function TaskItem({ task, toggleTaskCompleted, updateTask,deleteTask  }) {
 
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);
 const [completed,setCompleted] = useState(task.completed)

 const [showModal, setShowModal] = useState(false);

 const handleTaskClick = () => {
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
};
  
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
    setShowModal(false); // Ensure details are not shown after editing
  };

  const handleTaskDone = (e) => {
    console.log("Checkbox clicked");
    e.stopPropagation(); // Prevent event bubbling to the task item level
    setShowModal(false);
    const newCompletedStatus = !completed
    setCompleted(newCompletedStatus)
    updateTask({...task, completed: newCompletedStatus});
  }
  
  const toggleEditMode = (e) => {
    e.stopPropagation(); // Prevent opening details when clicking edit
    setEditMode(!editMode);
  };

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
        <div className="save-cancel-buttons">
          <button onClick={handleSave} className="saveButton">Save</button>
          <button onClick={() => setEditMode(false)} className="editButton">Cancel</button>
        </div>
       
     
      </div>
    );
  }

  return (
    <div>
      {showModal ? (
          <>
            <TaskDetails 
            task={task} 
            toggleEditMode = {toggleEditMode} 
            deleteTask = {deleteTask}
            handleCloseModal={handleCloseModal}
            />
            
          </>
             
      ) : (
        <div className="task-item" onClick={handleTaskClick}>
          <div className="task-checkbox-title">
            <input
              type="checkbox"
              checked={completed}
              onChange={handleTaskDone}
            />
            {title}
          </div>
          <TaskActions 
            toggleEditMode = {toggleEditMode} 
            deleteTask = {deleteTask}
          />
        </div>
      )}
    </div>
  );
}



  export default TaskItem