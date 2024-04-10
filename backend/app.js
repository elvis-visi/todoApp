const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose');
const app = express();
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const taskRouter = require('./controllers/tasks')
const usersRouter = require('./controllers/users')

// MongoDB Connection
mongoose.set('strictQuery', false)
logger.info('connection to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

    // Middleware
    app.use(express.json())
    app.use(middleware.requestLogger)

    app.use('/api/tasks', taskRouter)
    app.use('/api/users', usersRouter)

    app.use(middleware.errorHandler);

    const unknownEndpoint = (request, response) => {
        response.status(404).send({ error: 'unknown endpoint' })
      }
      
    app.use(unknownEndpoint)

 module.exports = app