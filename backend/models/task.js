const mongoose = require('mongoose');
//create the schema
//create the model based on the schema


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        trim: true
      },
      dueDate: {
        type: Date,
        required: true
      },
      dateAdded: {
        type: Date,
        default: Date.now
      },
      priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
      },
      completed: {
        type: Boolean,
        default: false
      },
      user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
})

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;