import { useState } from "react";
import TaskListView from "./components/TaskListView";


const tasksList =   [
  {
      "title": "Task 4",
      "description": "adding a new task",
      "dueDate": "2024-04-26T00:00:00.000Z",
      "dateAdded": "2024-04-11T09:57:47.823Z",
      "priority": 2,
      "completed": false,
      "user": {
          "username": "visi",
          "id": "6616c02c51c8f07efa59438c"
      },
      "id": "6617671bfe90b38b8bb021f5"
  },
  {
    "title": "Task 5",
    "description": "adding a new task",
    "dueDate": "2024-04-23T00:00:00.000Z",
    "dateAdded": "2024-04-11T09:57:47.823Z",
    "priority": 2,
    "completed": false,
    "user": {
        "username": "visi",
        "id": "6616c02c51c8f07efa59438c"
    },
    "id": "6617b41bfek9b28b8bb021f5"
},
  {
      "title": "react",
      "description": "adding a new task",
      "dueDate": "2024-05-18T00:00:00.000Z",
      "dateAdded": "2024-04-11T10:02:21.246Z",
      "priority": 3,
      "completed": false,
      "user": {
          "username": "visi",
          "id": "6616c02c51c8f07efa59438c"
      },
      "id": "6617b52dfj90467b8bb021fc"
  },
  {
    "title": "nodeJs",
    "description": "JS environment",
    "dueDate": "2024-04-21T00:00:00.000Z",
    "dateAdded": "2024-04-11T10:02:21.246Z",
    "priority": 3,
    "completed": false,
    "user": {
        "username": "visi",
        "id": "6616c02c51c8f07efa59438c"
    },
    "id": "6617b52dfe65b38b8ad021fc"
},
{
  "title": "nodeJs",
  "description": "JS environment",
  "dueDate": "2024-04-24T00:00:00.000Z",
  "dateAdded": "2024-04-11T10:02:21.246Z",
  "priority": 3,
  "completed": false,
  "user": {
      "username": "visi",
      "id": "6616c02c51c8f07efa59438c"
  },
  "id": "6617b52dfe90b38b6cb021fc"
},
{
  "title": "nodeJs",
  "description": "JS environment",
  "dueDate": "2024-04-25T00:00:00.000Z",
  "dateAdded": "2024-04-11T10:02:21.246Z",
  "priority": 3,
  "completed": false,
  "user": {
      "username": "visi",
      "id": "6616c02c51c8f07efa59438c"
  },
  "id": "6617b52dfe90b0vb8bb021fc"
},
]

 //parent takes the data at props, pass it down  to the sub components
function App() {
const [tasks,setTasks] = useState(tasksList)

  return (
    <>
      <TaskListView  
      tasks={tasks}
      setTasks={setTasks}
      />
    </>
  )
}

export default App
