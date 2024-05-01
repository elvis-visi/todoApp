import { useState } from "react";
import { v4 as uuidv4 } from 'uuid'; 

function AddNewTaskButton({addNewTask, date}) {
    
  const [isVisible,setVisibility] = useState(false);
  const [priority, setPriority] = useState("");

  const [title,setTitle] = useState('')
  const [description,setDescription] =useState('')


  const formatDate = (date) => {
    const d = new Date(date);
    return new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
  };


  const [dueDate, setDueDate] = useState(formatDate(date));
  const handleAddTaskClick = () => {
    setVisibility(!isVisible)
     // Reset priority to an empty string each time the modal is opened
     if (!isVisible) {
      setPriority("");
    }
  }

  const handleSelectChange = (event) => {
    setPriority(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const newTask = () => {
    const effectivePriority = priority || "3";
    return {
      id: uuidv4(),
      title: title,
      description: description,
      dueDate: new Date(dueDate).toISOString(), // Adjust based on user input if needed
      dateAdded: new Date().toISOString(),
      priority: effectivePriority,
      completed: false,
      user: {
        username: "visi",
        id: "some-fixed-or-dynamic-user-id"
      }
    };
  }
  return (
      <>
      <button onClick={handleAddTaskClick} className="add-task-button">+ Add Task</button>
     
     {isVisible &&   (
      <div className="add-task-modal">
      <input 
      type="text" 
      placeholder="Task name" 
      value={title}
      onChange={handleTitleChange}
      />
     <textarea
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
      />
      
    
       <select value={priority}
       onChange={handleSelectChange}
       
       >
        <option value="" disabled>Select Priority</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
       </select>

       <input 
          type="date"
          value={dueDate}
          onChange={handleDueDateChange}
       />
         <div className="task-actions">
        <button onClick={handleAddTaskClick}>Cancel</button>
        <button onClick={ () => addNewTask(newTask())}  className="save">Add task</button>
      </div>
    </div>
     )}

      
    </>
    );
  }


  export default AddNewTaskButton


