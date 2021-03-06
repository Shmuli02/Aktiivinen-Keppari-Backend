const config = require('../utils/config')
const noteRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


noteRouter.get('/', async (request,response) => {
  const notes = await Note.find({}).populate('user', {username: 1, name: 1})
  response.json(notes.map(note => note.toJSON()))
})

noteRouter.post('/', async (request, response) => {
  const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const note = new Note({
    task : body.task,
    url : body.url,
    user : user.id,
    allowedToPublish: body.allowedToPublish
  })


  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.json(savedNote.toJSON())
})

noteRouter.put('/:id', async (request, response) => {
  const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const note = await Note.findById(request.params.id)
  if (note == null) {
    return response.status(401).json({error: 'invalid task id'})
  }

  const newNote = {
    task: note.task,
    url: body.url,
    user: user.id
  }

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, newNote, {new: true})
  response.json(updatedNote.toJSON())

})

noteRouter.delete('/:id', async (request, response) => {
  const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


noteRouter.get('/:id', async (request,response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note.toJSON())
  } else {
    response.status(404).end()
  }
})

module.exports = noteRouter