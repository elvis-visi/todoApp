const taskRouter =require('express').Router()
const Task = require('../models/task')



taskRouter.get('/',async (request, response) => {
    const tasks = await Task.find({})
    response.json(tasks)
} )

notesRouter.get('/:id', async (request, response, next) => {
    try {
      const note = await Note.findById(request.params.id)
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    } catch(exception) {
      next(exception)
    }
  })



taskRouter.post('/', async (request,response) => {
    const body = request.body

    if (!body.title) {
        return response.status(400).json({error: 'title is required'})
    }

    const task =  new Task({
        title: body.title,
        description: body.description,
        dueDate: body.dueDate,
        dateAdded: body.dateAdded,
        priority: body.priority,
        completed: body.completed
    })

    try{
        const savedTask = await task.save()
        response.status(201).json(savedTask)
    }catch(exception){
        next(exception)
      }

})

module.exports = taskRouter