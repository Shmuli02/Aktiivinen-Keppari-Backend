const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Task = require('../models/task')
const User = require('../models/user')


beforeEach( async () => {
  await User.deleteMany({})
  await Task.deleteMany({})
  let userObject = new User(helper.test_user[0])
  await userObject.save()
  let taskObject = new Task(helper.test_tasks[0])
  await taskObject.save()

})

test('tasks are returned as json', async () => {
  await api
    .get('/api/tasks')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all tasks are returned', async () => {
  const response = await api.get('/api/tasks')

  expect(response.body).toHaveLength(helper.test_tasks.length)
})