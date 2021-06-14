const taskRouter = require('express').Router()
const Task = require('../models/task')


taskRouter.get('/', async (request,response) => {
  const tasks = await Task.find({})
  response.json(tasks.map(task => task.toJSON()))
})

module.exports = taskRouter