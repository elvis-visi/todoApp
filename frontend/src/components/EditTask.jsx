export default function EditTask() {
    return (
      <div className="edit-task-modal">
        <input type="text"  placeholder="Task" />
        <textarea  placeholder="Description of the task"></textarea>
        <div className="edit-task-actions">
          <button >Cancel</button>
          <button >Save</button>
        </div>
      </div>
    );
  }