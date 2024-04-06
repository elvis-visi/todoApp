const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose');
const app = express();
const logger = require('./utils/logger')

// Middleware
app.use(express.json())

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



      module.exports = app