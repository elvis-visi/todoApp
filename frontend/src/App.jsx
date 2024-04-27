import { useEffect, useState } from "react";

import TaskListView from "./components/TaskListView";
import Login from "./components/Login";
import loginService from './services/login'
import tasksService from './services/tasks'

 //parent takes the data at props, pass it down  to the sub components
function App() {
const [tasks,setTasks] = useState([])
const [user,setUser] = useState(null)
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

console.log('Rendering App');

//fetch tasks when `user` changes and is not null
useEffect(() => {
  if(user && user.token){
    tasksService.setToken(user.token)
    fetchTasks()
  }
},[user]) // Dependency on `user` state



const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login event ',event)
    console.log('logging in with', username, password)

    try{
      const user = await loginService.login({
        username,password
      })
      setUser(user)
      setUsername('')
      setPassword('')

    }catch(exception){
      console.log(exception)
      setUser(null)
    }

  }

  const fetchTasks = async () => {
    try {
      const tasksData = await tasksService.getAll();
      setTasks(tasksData);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
      setTasks([]);
    }
  };

  return (
    <>
    {user === null
    ?
    <Login 
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
    :
    <TaskListView  
    tasks={tasks}
    setTasks={setTasks}
    />
    }

    
     
    </>
  )
}

export default App
