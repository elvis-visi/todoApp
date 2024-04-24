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



   const addNewTask = (newTask) => {
    setTasks(tasks.concat(newTask))
   }

    const todayAtMidnight = new Date();
    todayAtMidnight.setHours(0, 0, 0, 0);
     
    // Split tasks into overdue and today's tasks
    const overdueTasks = tasks.filter(task => new Date(task.dueDate) < todayAtMidnight);
   



    const groupedUpcomingTasks = groupTasksByDueDate(tasks, todayAtMidnight);
  
    return (
      <div className="task-list-view">
        <Header />
        {overdueTasks.length > 0 && (
          <>
          <div className="task-list-headerOverdue">
          <h2>Overdue</h2>  
          reschedule overdue tasks
          <input 
          type="date"
          />
          </div>
           
            {overdueTasks.map((task,index) => (
              <TaskItem key={task.id + index} {...task} />
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
          <TaskItem key={task.id + index} {...task} />)}
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