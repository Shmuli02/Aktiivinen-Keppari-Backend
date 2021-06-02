const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { nonExistingId } = require('../tests/test_helper')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username : 1, name : 1})
  response.json(blogs.map(blog => blog.toJSON()))
  })
  
  blogRouter.post('/', async (request, response,next) => {
    const body = request.body

    const blog = new Blog(body)
    const user = await User.findById(body.user)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
  })

module.exports = blogRouter