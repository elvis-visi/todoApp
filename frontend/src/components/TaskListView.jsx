import Header from "./Header";
import TaskItem from "./TaskItem";
import AddNewTaskButton from './AddNewTaskButton'

const TaskListView = ({ tasks }) => {
    const todayAtMidnight = new Date();
    todayAtMidnight.setHours(0, 0, 0, 0);
     
    // Split tasks into overdue and today's tasks
    const overdueTasks = tasks.filter(task => new Date(task.dueDate) < todayAtMidnight);
    const todaysTasks = tasks.filter(task => 
      new Date(task.dueDate).toDateString() === new Date().toDateString()
    );
  
    return (
      <div className="task-list-view">
        <Header />
        {overdueTasks.length > 0 && (
          <>
          <div className="task-list-headerOverdue">
          <h2>Overdue</h2>  <button>reschedule overdue tasks</button>
          </div>
           
            {overdueTasks.map(task => (
              <TaskItem key={task.id} {...task} />
            ))}
          </>
        )}
  
        {todaysTasks.length > 0 && (
          <>
          <div className="task-list-headerToday">
          <h2>Today</h2>
          </div>
            {todaysTasks.map(task => (
              <TaskItem key={task.id} {...task} />
            ))}
          </>
        )}
  
        <AddNewTaskButton />
      </div> 
    );
  };


  export default TaskListView