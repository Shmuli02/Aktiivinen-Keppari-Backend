const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  var likes = 0
  blogs.forEach(blog => {
    likes += blog.likes
  });
  return likes
}

module.exports = {
  dummy,
  totalLikes
}