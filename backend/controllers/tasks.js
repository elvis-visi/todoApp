const taskRouter =require('express').Router()
const Task = require('../models/task')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


taskRouter.get('/',async (request, response) => {
    const tasks = await Task
    .find({}).populate('user',{username:1})
    response.json(tasks)
} )


taskRouter.get('/filter', async (request, response, next) => {
  try {
      const { priority } = request.query;
      const filterOptions = {};
      console.log("Filtering tasks by priority:", priority);  // Debug log

      if (priority) {
          filterOptions.priority = priority;
      }

      const tasks = await Task.find(filterOptions).populate('user', { username: 1 });
      console.log("Filtered tasks:", tasks);  // Debug log
      response.json(tasks);
  } catch (error) {
      console.error("Error in /filter endpoint:", error);  // Error logging
      next(error);
  }
});


taskRouter.get('/:id', async (request, response, next) => {
    try {
      const task = await Task.findById(request.params.id)
      if (task) {
        response.json(task)
      } else {
        response.status(404).end()
      }
    } catch(exception) {
      next(exception)
    }
  })

// tasks.js controller



                 
taskRouter.delete('/:id', async (request, response, next) => {
   try{
    await Task.findByIdAndDelete(request.params.id)
    response.status(204).end()
   }catch(error){
    next(error)
   }
})



const getTokenFrom = request => {
  const authorization = request.get('authorization') // 'bearer token'

  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
  return null
}


taskRouter.post('/', async (request,response,next) => {
    const body = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(401).json({error: 'token invalid'})
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!body.title) {
        return response.status(400).json({error: 'title is required'})
    }

    const task =  new Task({
        title: body.title,
        description: body.description,
        dueDate: body.dueDate,
        dateAdded: body.dateAdded,
        priority: body.priority,
        completed: body.completed,
        user: user._id
    })

    try{
        const savedTask = await task.save()
        user.tasks = user.tasks.concat(savedTask._id)
        await user.save()

        response.status(201).json(savedTask)
    }catch(exception){
        next(exception)
      }

})

module.exports = taskRouter