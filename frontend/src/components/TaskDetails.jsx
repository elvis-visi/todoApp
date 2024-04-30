import React from 'react';

const TaskDetails = ({ task }) => {
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
    </div>
  );
};

export default TaskDetails;
