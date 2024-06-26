import { useState } from "react";
import Header from "./Header";
import TaskItem from "./TaskItem";
import AddNewTaskButton from './AddNewTaskButton'
import tasksService from '../services/tasks'


const groupTasksByDueDate = (tasks, todayAtMidnight) => {

  return tasks
    .filter(task => new Date(task.dueDate) > todayAtMidnight)
    .reduce((acc,task) => {
      //for each task we check whether its dueDate is a property in acc
      const dateStr = new Date(task.dueDate).toDateString();
      //if not create that property and add key-value  dueDateStr- [] to acc
      if(!acc[dateStr]){
        acc[dateStr] = [];
      }
      //else push the task to th
      acc[dateStr].push(task)
      return acc;
    },{})
}





const TaskListView = ({ tasks, setTasks, handleLogout }) => {

  console.log('Rendering TaskListView', tasks);

  const [searchTerm,setSearchTerm] = useState('')
  const [sortType, setSortType] = useState('none');  // 'none', 'priority', or 'dateAdded'
  const [reschedule, setReschedule] = useState();

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )



    // Optionally sort tasks by priority (1 is highest priority)
    const sortedTasks = filteredTasks.sort((a, b) => {
      if (sortType === 'priority') {
        return a.priority - b.priority;
      } else if (sortType === 'dateAdded') {
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      }
      return 0; // No sorting
    });
    

const updateTask = async (task) => {
  
  try{
    const updatedTask = await tasksService.updateTask(task.id, task)

    setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    )
  );
  }catch(error){
    console.error('Error updating task:', error);
    alert('Failed to update task.');
  }
  
};

const deleteTask = async (taskId) => {

  try{
    const deletedTask = await tasksService.deleteTask(taskId)
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
  }catch(error){
    console.error("Failed to delete task:", error);
    alert("Failed to delete task!");
  }

};
  
   const addNewTask = async (newTask) => {
    try{
     const newTaskB = await tasksService.create(newTask)
     setTasks(tasks.concat(newTaskB));
    }catch(exception){
      console.error("Failed to add new task:", exception);
      alert("Failed to add task!");
    }  
}

    const todayAtMidnight = new Date();
    todayAtMidnight.setHours(0, 0, 0, 0);
     
    // Split tasks into overdue and today's tasks
    const overdueTasks = sortedTasks.filter(task => new Date(task.dueDate) < todayAtMidnight && !task.completed);
const groupedUpcomingTasks = groupTasksByDueDate(sortedTasks.filter(task => !task.completed), todayAtMidnight);

// Ensure today's date is always available for adding tasks
if (!groupedUpcomingTasks[todayAtMidnight.toDateString()]) {
  groupedUpcomingTasks[todayAtMidnight.toDateString()] = [];
}


  
const rescheduleFunc = async (e) => {
  
  try{
    const newDueDate = e.target.value;
    setReschedule(newDueDate);
    await tasksService.rescheduleTask({newDueDate: newDueDate})

     // Update the tasks state with the new due dates
  setTasks((prevTasks) =>
  prevTasks.map((task) => {
    if (overdueTasks.find((ot) => ot.id === task.id)) {
      task.dueDate = newDueDate;
    }
    return task;
  })
);

  }catch(error) {
    console.log("error", error)
  }
  
};


    return (
      <div className="task-list-view">
        <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        sortType={sortType}
        setSortType={setSortType}
        handleLogout={handleLogout}
        />
  
       {overdueTasks.length > 0 && (
  <section className="overdue_section">
    <div className="task-list-headerOverdue">
      <h3>Overdue</h3>
      <button className="reschedule-btn" onClick={() => document.getElementById('reschedule-input').showPicker()}>
        Reschedule
      </button>
      <input
        type="date"
        id="reschedule-input"
        value={reschedule}
        onChange={(e) => rescheduleFunc(e)}
      />
    </div>
    {overdueTasks.map((task, index) => (
      <TaskItem
        key={task.id + index}
        task={task}
        updateTask={updateTask}
        deleteTask={() => deleteTask(task.id)}
      />
    ))}
  </section>
)}
  


   {Object.entries(groupedUpcomingTasks)
    .sort(([dateA],[dateB]) => new Date(dateA) - new Date(dateB))
    .map(([date, tasks]) => (
        <section className="upcoming-tasks" key={date}>
          <h3>{ new Date(date).toDateString() === new Date().toDateString() ? 
            'Today' : date
        }</h3>

          

          {tasks.map((task,index)=> 
          <TaskItem 
          key={task.id + index} 
          task={task} 
          updateTask={updateTask}
          deleteTask={() => deleteTask(task.id)}
          />)}
              <AddNewTaskButton
                 addNewTask={addNewTask}
                 date={date}
              />
        </section>
      ))}
  
      </div> 
    );
  };


  export default TaskListView