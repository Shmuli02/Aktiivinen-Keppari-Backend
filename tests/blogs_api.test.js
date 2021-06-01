const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach( async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.test_blogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.test_blogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.test_blogs.length)
})

test('a spesific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(a => a.title)

  expect(titles).toContain(
    'React patterns'
  )
})
describe('test blog requirements', () => {
  test('add new blog', async () => {
    new_blog = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }
    await api
      .post('/api/blogs')
      .send(new_blog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.test_blogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'Canonical string reduction'
    )
  })
  test('add new blog without likes', async () => {
    new_blog = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      __v: 0
    }
    await api
      .post('/api/blogs')
      .send(new_blog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd.find( ({id}) => id === "5a422b3a1b54a676234d17f9")

    expect(addedBlog.likes).toEqual(0)
  })

  test('blog without title is not added', async () => {
    new_blog_without_title = {
      _id: "5a422b3a1b54a676234d17f9",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes : 10,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(new_blog_without_title)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.test_blogs.length)
  })

  test('blog without url is not added', async () => {
    new_blog_without_url = {
      _id: "5a422b3a1b54a676234d17f9",
      author: "Edsger W. Dijkstra",
      title: "Canonical string reduction",
      likes : 10,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(new_blog_without_url)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.test_blogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
