// import the Task model
const Task = require('../models/task')
const User = require('../models/user')
// initialTasks array
const initialTasks = [
    {
        title: "Complete project proposal",
        description: "Finalize the project proposal and submit it for review",
        dueDate: "2023-06-15T00:00:00.000Z",
        dateAdded: "2024-04-06T11:34:15.807Z",
        priority: "high",
        completed: false,
    },  
    {
        title: "2nd task",
        description: "added a second task",
        dueDate: new Date("2023-06-15T00:10:00.000Z"),
        dateAdded: new Date("2024-05-06T11:34:15.807Z"),
        priority: "medium",
        completed: false,
    },

]


//fetch all tasks
const tasksInDb = async () => {
    const tasks = await Task.find({})
    return tasks.map(task => task.toJSON())
}

const usersInD = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports =  {
    initialTasks, tasksInDb, usersInD
}