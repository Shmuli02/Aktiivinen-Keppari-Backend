const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { nonExistingId } = require('../tests/test_helper')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
  })
  
  blogRouter.post('/', async (request, response,next) => {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save(function(error, post) {
      if(error){return next(error)}
      response.json(post.toJSON())
    })

    
  })

module.exports = blogRouter