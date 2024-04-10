const {test, after, beforeEach, describe} = require('node:test')
const Task = require('../models/task')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert');
const helper = require('./test_helper')

const bcrypt = require('bcrypt')
const User = require('../models/user')

//allows you to simulate HTTP requests, inspect responses, and assert expected behavior
const api = supertest(app)

describe('when there is initially some tasks saved', () =>{

  beforeEach(async () => {
    await Task.deleteMany({})
    await Task.insertMany(helper.initialTasks)
  })

  test('tasks are returned as json', async () => {
    await api
      .get('/api/tasks') //It returns a response object that represents the HTTP response received from the server.
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two tasks', async () => {
    const response = await helper.tasksInDb() //directly interacts with the database using the Task model and retrieves all the tasks from the database.
    // console.log('response tasks ', response)
    assert.strictEqual(response.length, helper.initialTasks.length)
})  

test('the first task title is about project proposal', async () => {
  //get all tasks -> get method
  const response = await helper.tasksInDb()

  const titles = response.map(ele => ele.title)
  //assert 
  assert(titles.includes('Complete project proposal'))
})

//verify the number of tasks returned increases
//and the new task is in the list

describe('addition of a new task', () => {
  test('succeeds with valid data ', async () => {

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
    const response = await helper.tasksInDb()
    assert.strictEqual(response.length, helper.initialTasks.length+1)
  
      //assert that the new task exists in the list
    const titles = response.map(e => e.title)
    assert(titles.includes('Task 3'))  
  
  })

  test('fails with status code 400 if data invalid', async() => {
    const newTask = {
        description: "Added a third task",
        dueDate: "2023-06-15T00:00:00.000Z",
        dateAdded: "2024-07-06T11:34:15.807Z",
        priority: "low",
        completed: false,
    }

    await api. 
    post('/api/tasks')
    .send(newTask)
    .expect(400)

    const response = await helper.tasksInDb()
    assert.strictEqual(response.length, helper.initialTasks.length)

})
})

describe('viewing a specific task', () => {
  test('succeeds with a valid id', async () => {
    const tasksAtStart = await helper.tasksInDb()
    const taksToView = tasksAtStart[0]
  
    const resultTask = await api
      .get(`/api/tasks/${taksToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    // console.log('Expected task:', taksToView)
    // console.log('Actual task:', resultTask.body)
  
    // Convert dueDate and dateAdded fields to Date objects in the actual task object
    resultTask.body.dueDate = new Date(resultTask.body.dueDate)
    resultTask.body.dateAdded = new Date(resultTask.body.dateAdded)
    // console.log('Actual task conversion:', resultTask.body)
  
    assert.deepStrictEqual(taksToView, resultTask.body)
  })
})


describe('deletion of a task', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    //fetch all tasks
    const tasksAtStart = await helper.tasksInDb()
    //task to be deleted
    const taskToDelete = tasksAtStart[0]
    //delete -> delete http request
    await api. 
            delete(`/api/tasks/${taskToDelete.id}`)
            .expect(204)
  
    //current Tasks after deletion
    const tasksAtEnd = await helper.tasksInDb()
  
    //assert tasks size 
    assert.strictEqual(tasksAtEnd.length, tasksAtStart.length - 1);
  
    //assert the title of deleted task not included
    const titles = tasksAtEnd.map(ele => ele.title)
    assert(!titles.includes(taskToDelete.title))
  
  
  })
})
})

//User tests

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    //add 1 user
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({username: 'root', passwordHash})

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDB()
    
    //create User model -> pass a JS object as param
    const newUser = {
      username: 'visi1',
      name:'visi',
      password:'visi',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDB()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(user => user.username)
      assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'root',
      name:'root2',
      password:'sekret',
    }

    const result = await api 
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtStart.length, usersAtEnd.length)

  })


})

  after(async () => {
    await mongoose.connection.close()
  })




  /*
  By using the supertest library and the api instance, you can write tests that simulate HTTP requests 
  and assertions against the Express application without having to start a separate server process.
  supertest takes care that the application being tested is started at the port that it uses internally.



  So, while await api.get('/api/tasks') sends an HTTP request to the server and returns a response object with headers, status, and body,
   await helper.tasksInDb() directly interacts with the database and returns the task documents converted to plain JavaScript objects.
 The first test case focuses on testing the API endpoint and the response it sends back, while the second test case focuses on checking
 the actual data stored in the database and comparing it with the expected data defined in the initialTasks array.
  */