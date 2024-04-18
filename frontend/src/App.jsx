const tasks =   [
  {
      "title": "Task 4",
      "description": "adding a new task",
      "dueDate": "2024-04-16T00:00:00.000Z",
      "dateAdded": "2024-04-11T09:57:47.823Z",
      "priority": 2,
      "completed": false,
      "user": {
          "username": "visi",
          "id": "6616c02c51c8f07efa59438c"
      },
      "id": "6617b41bfe90b38b8bb021f5"
  },
  {
      "title": "react",
      "description": "adding a new task",
      "dueDate": "2024-04-18T00:00:00.000Z",
      "dateAdded": "2024-04-11T10:02:21.246Z",
      "priority": 3,
      "completed": false,
      "user": {
          "username": "visi",
          "id": "6616c02c51c8f07efa59438c"
      },
      "id": "6617b52dfe90b38b8bb021fc"
  },]


 //parent takes the data at props, pass it down  to the sub components

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
      {overdueTasks.length > 0 && (
        <>
          <h2>Overdue</h2>
          {overdueTasks.map(task => (
            <TaskItem key={task.id} {...task} />
          ))}
        </>
      )}

      {todaysTasks.length > 0 && (
        <>
          <h2>Today</h2>
          {todaysTasks.map(task => (
            <TaskItem key={task.id} {...task} />
          ))}
        </>
      )}

      <button>Add Task</button>
    </div> 
  );
};


 function TaskItem({ title, description, dueDate, priority }) {
  return (
    <div className="task-item">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Due by: {new Date(dueDate).toLocaleDateString()}</p>
      <p>Priority: {priority}</p>
      {/* More task details */}
    </div>
  );
}




function App() {

  return (
    <>
      <TaskListView  tasks={tasks}/>
    </>
  )
}

export default App
