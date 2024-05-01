import React from 'react';
import TaskActions from './TaskActions';

const TaskDetails = ({ task,toggleEditMode, deleteTask, handleCloseModal }) => {
  return (
    <div className="task-details">
      <h2>Task Details</h2>
      <div className="task-detail-item">
        <label>Title:</label>
        <span>{task.title}</span>
      </div>
      <div className="task-detail-item">
        <label>Description:</label>
        <span>{task.description}</span>
      </div>
      <div className="task-detail-item">
        <label>Due Date:</label>
        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
      </div>
      <div className="task-detail-item">
        <label>Priority:</label>
        <span>{task.priority}</span>
      </div>
      <div className='edit-delete-close'>
      <TaskActions 
            toggleEditMode = {toggleEditMode} 
            deleteTask = {deleteTask}
          />
      <button onClick={handleCloseModal} className='closeButton'>Close</button>    
      </div>
     
    </div>
  );
};

export default TaskDetails;
