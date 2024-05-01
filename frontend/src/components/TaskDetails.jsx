import React from 'react';
import TaskActions from './TaskActions';

const TaskDetails = ({ task,toggleEditMode, deleteTask }) => {
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
      <TaskActions 
            toggleEditMode = {toggleEditMode} 
            deleteTask = {deleteTask}
          />
    </div>
  );
};

export default TaskDetails;
