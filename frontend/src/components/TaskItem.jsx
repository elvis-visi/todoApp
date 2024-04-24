
import EditDeleteIcons from "./EditDeleteIcons";

function TaskItem({task,toggleTaskCompleted}) {
  
  const { id, completed, title, description, dueDate, priority, } = task

  
  return (
      <div className="task-item">
       
       <button
        onClick={toggleTaskCompleted}
        disabled={completed}
      >
        Done
      </button>
       
       <div className="task-item-content">
       <h3>{title}</h3>
        <p>{description}</p>
        <p>Due by: {new Date(dueDate).toLocaleDateString()}</p>
        <p>Priority: {priority}</p>
        <input 
         type="date"
        />

      <EditDeleteIcons />

       </div>
       
      </div>
    );
  }


  export default TaskItem