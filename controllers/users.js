const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request,response) => {
  const body = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username : body.username,
    firstname : body.firstname,
    lastname: body.lastname,
    email: body.email,
    diploma: '',
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', {task : 1, url: 1})

  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter 