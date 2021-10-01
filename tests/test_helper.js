const Blog = require('../models/blog')
const User = require('../models/user')


const test_blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]
const test_user = [{
  username: 'Late',
  name: 'Late Lammas',
  password: 'salis',
}]

const test_tasks = [
  {
    _id:"60c75dfe54a3eb64bfbf55f0",
    title:"Ota kuva kepparista",
    difficulty:"helppo",
    description:"Tehtävänä on ottaa kuva kepparista valitsemassasi ympäristössä."
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  test_blogs, test_user, test_tasks, nonExistingId, blogsInDb,usersInDb
}