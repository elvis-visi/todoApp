

const TaskActions = ({toggleEditMode, deleteTask}) => {
    return (
        <div className="editDelete">
        <button onClick={toggleEditMode} className="edit-button">
          Edit
        </button>
        <button onClick={(e) => { e.stopPropagation(); deleteTask(); }} className="delete-task-button">
          Delete
        </button>
      </div>
    )

}



export default TaskActions