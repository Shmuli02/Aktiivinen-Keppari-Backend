const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach( async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  let blogObject = new Blog(helper.test_blogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.test_blogs[1])
  await blogObject.save()
  let userObject = new User(helper.test_user[0])
  await userObject.save()

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
    const user = await User.find({name: helper.test_user[0].name})

    new_blog = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      user : user[0]._id,
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
    const user = await User.find({name: helper.test_user[0].name})
    new_blog = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      user : user[0]._id,
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

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
