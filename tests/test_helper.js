const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const user = new User({ username: 'root', password: 'secret'})

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

const addBlogWithUser = async () => {

    const userForBlog = await User.find({})

    const newBlogWithUser = {
        title: 'Blogtest5',
        author: 'Author5',
        url: 'test',
        likes: 5,
        user: userForBlog[0]._id
    }
    const blogToAdd = new Blog(newBlogWithUser)
    await blogToAdd.save()

}

const createToken = async () => {
    const userToSign = await User.find({})
    const userForToken = {
        username: userToSign[0].username,
        id: userToSign[0]._id,
    }
    const token = await jwt.sign(userForToken, process.env.SECRET)
    return token
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  


module.exports = {addBlogWithUser, initialBlogs, blogsInDb, usersInDb, createToken}