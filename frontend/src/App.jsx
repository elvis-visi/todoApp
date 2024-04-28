import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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

useEffect(() => {
  const loggedUserJson=
  window.localStorage.getItem('loggedTaskappUser')
  if(loggedUserJson) {
    const user = JSON.parse(loggedUserJson)
    setUser(user)
    tasksService.setToken(user.token)
  }
},[])

const handleLogout = () => {
  window.localStorage.removeItem('loggedTaskappUser')
  setUser(null)
  tasksService.setToken(null)
}


const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login event ',event)
    console.log('logging in with', username, password)

    try{
      const user = await loginService.login({
        username,password
      })
      //parse user object to JSON fist
      window.localStorage.setItem(
        'loggedTaskappUser', JSON.stringify(user)
      )
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

<Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> :
         <Login 
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
         />} 
         />
        <Route path="/" element={user ? <TaskListView 
          tasks= {tasks}
          setTasks= {setTasks}
          handleLogout={handleLogout}
        /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
    
   
  )
}

export default App
