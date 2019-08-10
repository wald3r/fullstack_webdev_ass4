const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [{
        title: 'Blogtest1',
        author: 'Author1',
        url: 'test',
        likes: 1,
    },
    {
        title: 'Blogtest2',
        author: 'Author2',
        url: 'test',
        likes: 2
    },
    {
        title: 'Blogtest3',
        author: 'Author3',
        url: 'test',
        likes: 3
    },
    {
        title: 'Blogtest4',
        author: 'Author4',
        url: 'test',
        likes: 4
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  


module.exports = {initialBlogs, blogsInDb, usersInDb}