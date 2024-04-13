const taskRouter =require('express').Router()
const Task = require('../models/task')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const middleware = require('../utils/middleware')


taskRouter.put('/reschedule', middleware.getUser, async (request, response, next) => {
  const { newDueDate } = request.body;
  const user = request.user;

  if (!user) {
      return response.status(404).json({ error: 'User not found' });
  }

  if (!newDueDate) {
      return response.status(400).json({ error: 'New due date is required' });
  }

  // Convert newDueDate to a Date object and validate it
  const parsedNewDueDate = new Date(newDueDate);
  if (isNaN(parsedNewDueDate.getTime())) {
      return response.status(400).json({ error: 'Invalid new due date provided' });
  }

  try {
      // Update all tasks for this user where the dueDate is past (overdue)
      const result = await Task.updateMany(
          {
              user: user._id,     // only the tasks of the logged-in user are updated
              dueDate: { $lt: new Date() } // Selects tasks whose dueDate is less than the current date (overdue)
          },
          {
              $set: { dueDate: parsedNewDueDate } // Sets the new dueDate for the matched tasks
          }
      );

      if (result.nModified === 0) {
          return response.status(404).json({ message: "No overdue tasks found to reschedule." });
      }

      response.status(200).json({ message: 'Overdue tasks rescheduled successfully.' });
  } catch (error) {
      console.error("Error in /reschedule endpoint:", error);
      next(error);
  }
});

taskRouter.get('/',async (request, response) => {
    const tasks = await Task
    .find({}).populate('user',{username:1})
    response.json(tasks)
} )

taskRouter.get('/sort', async (request, response) => {
  //query params passed, sortBy and the order --> asc/desc  1/-1
  const {sortBy, order} = request.query
  //empty object where we pass the params
  const sortOptions = {}
  //conditionals, which params to add to sortObject
  const allowedFields = ['dateAdded', 'dueDate', 'priority'];
if (allowedFields.includes(sortBy) && ['asc', 'desc'].includes(order)) {
  sortOptions[sortBy] = order === 'desc' ? -1 : 1;
} else {
  return response.status(400).json({ error: 'Invalid sort options provided' });
}
  //fetch tasks, and sort(), pass the sortObject to sort(), then populate
  const tasks = await Task.find({}).sort(sortOptions).populate('user',{username :1})
  response.json(tasks);
})


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

taskRouter.put('/:id', middleware.getUser, async (request, response, next) => {
  const body = request.body;
  const user = request.user;
  const taskId = request.params.id;

  if (!user) {
    return response.status(404).json({ error: 'User not found' });
  }

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return response.status(404).json({ error: 'Task not found' });
    }

    if (task.user.toString() !== user._id.toString()) {
      return response.status(403).json({ error: 'Not authorized to update this task' });
    }

    const updatedTask = {
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      priority: body.priority,
      completed: body.completed,
    };

    //{ new: true } option ensures that the updated task is returned in the response.
    const savedTask = await Task.findByIdAndUpdate(taskId, updatedTask, { new: true });
    response.json(savedTask);
  } catch (exception) {
    next(exception);
  }
});





module.exports = taskRouter

