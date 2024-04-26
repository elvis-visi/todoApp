import { useState } from "react";
import Header from "./Header";
import TaskItem from "./TaskItem";
import AddNewTaskButton from './AddNewTaskButton'


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





const TaskListView = ({ tasks, setTasks }) => {

  const [searchTerm,setSearchTerm] = useState('')
  const [sortType, setSortType] = useState('none');  // 'none', 'priority', or 'dateAdded'
  const [reschedule, setReschedule] = useState();

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const toggleTaskCompleted = (taskId) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task
        )
      );
    };

    // Optionally sort tasks by priority (1 is highest priority)
    const sortedTasks = filteredTasks.sort((a, b) => {
      if (sortType === 'priority') {
        return a.priority - b.priority;
      } else if (sortType === 'dateAdded') {
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      }
      return 0; // No sorting
    });
    

const updateTask = (updatedTask) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    )
  );
};

const deleteTask = (taskId) => {
  setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
};
  
   const addNewTask = (newTask) => {
    setTasks(tasks.concat(newTask));
}

    const todayAtMidnight = new Date();
    todayAtMidnight.setHours(0, 0, 0, 0);
     
    // Split tasks into overdue and today's tasks
    const overdueTasks = sortedTasks.filter(task => new Date(task.dueDate) < todayAtMidnight && !task.completed);
const groupedUpcomingTasks = groupTasksByDueDate(sortedTasks.filter(task => !task.completed), todayAtMidnight);





  
const rescheduleFunc = (e) => {
  const newDueDate = e.target.value;
  setReschedule(newDueDate);

  // Update the tasks state with the new due dates
  setTasks((prevTasks) =>
  prevTasks.map((task) => {
    if (overdueTasks.find((ot) => ot.id === task.id)) {
      task.dueDate = newDueDate;
    }
    return task;
  })
);
};


    return (
      <div className="task-list-view">
        <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        sortType={sortType}
        setSortType={setSortType}
        />
  
        {overdueTasks.length > 0 && (
          <>
          <div className="task-list-headerOverdue">
          <h2>Overdue</h2>  
         
          <input 
          type="date" value={reschedule} onChange={(e) => rescheduleFunc(e)}
          />
          </div>
           
            {overdueTasks.map((task,index) => (
              <TaskItem 
              key={task.id + index} 
              task={task}
              toggleTaskCompleted={() => toggleTaskCompleted(task.id)}
              updateTask={updateTask}
              deleteTask={() => deleteTask(task.id)}
              />
            ))}
          </>
        )}
  


   {Object.entries(groupedUpcomingTasks)
    .sort(([dateA],[dateB]) => new Date(dateA) - new Date(dateB))
    .map(([date, tasks]) => (
        <section key={date}>
          <h2>{ new Date(date).toDateString() === new Date().toDateString() ? 
            'Today' : date
        }</h2>

          

          {tasks.map((task,index)=> 
          <TaskItem 
          key={task.id + index} 
          task={task} 
          toggleTaskCompleted={() => toggleTaskCompleted(task.id)}
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