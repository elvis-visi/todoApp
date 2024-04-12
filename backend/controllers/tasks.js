const taskRouter =require('express').Router()
const Task = require('../models/task')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const middleware = require('../utils/middleware')

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

// api/tasks/search?searchTerm='vv'
taskRouter.get('/search', async(request,response,next) => {

 try{
  const {searchTerm} = request.query
  const filterOptions = {}

  if(searchTerm){
    filterOptions.title = {$regex: searchTerm, $options: 'i'}
  }
  const tasks = await Task.find(filterOptions).populate('user',{username:1})
  response.json(tasks)
 }catch (error) {
  console.error("Error in /search endpoint:", error);  
  next(error);
}

 
})


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



taskRouter.post('/', middleware.getUser, async (request,response,next) => {
    const body = request.body
    const user = request.user

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