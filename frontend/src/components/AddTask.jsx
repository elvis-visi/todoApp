
export default function AddTask() {
    return (
      <div className="add-task-modal">
        <input type="text" placeholder="Task name" />
        <textarea placeholder="Description"></textarea>
        
        <div className="task-actions">
          <button >Cancel</button>
          <button  className="save">Add task</button>
        </div>
      </div>
    );
  }
  