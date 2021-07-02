const imageRouter = require('express').Router()
const Image = require('../models/image')


imageRouter.get('/', async (request,response) => {
  const images = await Image.find({})
  response.json(images.map(image => image.toJSON()))
})

module.exports = imageRouter