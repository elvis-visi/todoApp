const tasks =   [
  {
      "title": "Task 4",
      "description": "adding a new task",
      "dueDate": "2024-04-18T00:00:00.000Z",
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

 const TaskListView = ({tasks}) => {
   
  // const date = Date.now()
  //check current date; tasks with dueDate > current date, store in 
  // overDue array ?

  //today tasks in today's array? 



  //Display all tasks initially

  return (
    <div className="task-list-view">
      {tasks.map(task => (
        <TaskItem key={task.id} {...task} />
      ))}
      {/* AddTaskButton will go here */}
      <button>Add Task</button>
    </div>
  );

 }


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
