const {test, after, beforeEach} = require('node:test')
const Task = require('../models/task')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert');

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
        dueDate: "2023-06-15T00:10:00.000Z",
        dateAdded: "2024-05-06T11:34:15.807Z",
        priority: "medium",
        completed: false,
    },

]

//allows you to simulate HTTP requests, inspect responses, and assert expected behavior
const api = supertest(app)


//we ensure that the database is in the same state before every test is run
beforeEach(async () => {
    await Task.deleteMany({})
    let taskObject = new Task(initialTasks[0])
    await taskObject.save()
    taskObject = new Task(initialTasks[1])
    await taskObject.save()
})



test('tasks are returned as json', async () => {
    await api
      .get('/api/tasks')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

test('there are two tasks', async () => {
    const response = await api.get('/api/tasks')
    console.log('response body ', response.body)
    assert.strictEqual(response.body.length, initialTasks.length)
})  

test('the first task title is about project proposal', async () => {
    //get all tasks -> get method
    const response = await api.get('/api/tasks')
    //focus on the titles of the tasks
    const titles = response.body.map(ele => ele.title)
    //assert 
    assert(titles.includes('Complete project proposal'))
})

//verify the number of tasks returned increases
//and the new task is in the list
test('a valid task can be added ', async () => {

    //create new task and  
    const newTask = {
        title: "Task 3",
        description: "Added a third task",
        dueDate: "2023-06-15T00:00:00.000Z",
        dateAdded: "2024-07-06T11:34:15.807Z",
        priority: "low",
        completed: false,
    }
   // make post request
    await api.
    post('/api/tasks')
    .send(newTask)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    //get all the tasks and assert the length of the new updated list
    const response = await api.get('/api/tasks')
    assert.strictEqual(response.body.length, initialTasks.length  +1)

      //assert that the new task exists in the list
    const titles = response.body.map(e => e.title)
    assert(titles.includes('Task 3'))  

})



  after(async () => {
    await mongoose.connection.close()
  })






  /*
  By using the supertest library and the api instance, you can write tests that simulate HTTP requests 
  and assertions against the Express application without having to start a separate server process.
  supertest takes care that the application being tested is started at the port that it uses internally.
  */