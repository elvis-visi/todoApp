const {test, after} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

//allows you to simulate HTTP requests, inspect responses, and assert expected behavior
const api = supertest(app)

test('tasks are returned as json', async () => {
    await api
      .get('/api/tasks')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  after(async () => {
    await mongoose.connection.close()
  })






  /*
  By using the supertest library and the api instance, you can write tests that simulate HTTP requests 
  and assertions against the Express application without having to start a separate server process.
  supertest takes care that the application being tested is started at the port that it uses internally.
  */