import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import TaskListView from "./components/TaskListView";
import Login from "./components/Login";
import Register from './components/Register';
import loginService from './services/login'
import registerService from './services/register';
import tasksService from './services/tasks'

 //parent takes the data at props, pass it down  to the sub components
function App() {
const [tasks,setTasks] = useState([])
const [user,setUser] = useState(null)
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [name, setName] = useState('');
const [errorMessage, setErrorMessage] = useState(null)

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
  console.log('login event ', event)
  console.log('logging in with', username, password)

  try {
    const user = await loginService.login({
      username, password
    })
    window.localStorage.setItem(
      'loggedTaskappUser', JSON.stringify(user)
    )
    setUser(user)
    setUsername('')
    setPassword('')
    setErrorMessage(null)
  } catch (exception) {
    console.log(exception.response.data.error)
    setErrorMessage(exception.response.data.error)
    setTimeout(() => {
      setErrorMessage(null)
    }, 1200) // clear the error message after 3 seconds
  }
}

  const handleLoginDirect = async (username, password) => {
    try {
        const user = await loginService.login({ username, password });
        window.localStorage.setItem('loggedTaskappUser', JSON.stringify(user));
        tasksService.setToken(user.token);
        setUser(user);
        setUsername('');
        setPassword('');
        setErrorMessage(null)
    } catch (exception) {
      console.log(exception.response.data.error)
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 1200) // clear the error message after 3 seconds
    }
};

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
        const user = await registerService.register({
            name,
            username,
            password
        });
        handleLoginDirect(username, password);
        setErrorMessage(null)
    } catch (exception) {
        console.error('Failed to register', exception);
        console.error('Failed to register', exception.response.data.error)
        setErrorMessage(exception.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 1200) // clear the error message after 3 seconds
    }
};



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
      <Route path="/register" element={user ? <Navigate to="/" /> : 
                    <Register
                        name={name}
                        username={username}
                        password={password}
                        handleNameChange={({ target }) => setName(target.value)}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        handleSubmit={handleRegister}
                        errorMessage={errorMessage}
                    />
                }/>
        <Route path="/login" element={user ? <Navigate to="/" /> :
         <Login 
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
          errorMessage={errorMessage}
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
