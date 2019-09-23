const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response, next) => {
  try{

    const blogs = await Blog.find({}).populate('user')
    return response.json(blogs)
  } catch(exception){
    next(exception)
  }
})


blogsRouter.delete('/:id', async (request, response, next) => {

  const blog = await Blog.findById(request.params.id)
 
  try{
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }else if(decodedToken.id !== blog.user.toString()){
      return response.status(401).json({ error: 'only the creator is allowed to delete this blog' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } catch(exception){
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {

  const body = request.body
  const newBlog = {
    author: body.author,
    likes: body.likes,
    url: body.url,
    name: body.name
  }

  try{
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog)
    return response.status(201).json(updatedBlog)
  } catch(exception){
    next(exception)
  }
})
  
blogsRouter.post('/', async (request, response, next) =>{ 

    const body = request.body
    const token = request.token
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
    const user = await User.findById(decodedToken.id)
    var blog = null
    if(body.author === undefined || body.url === undefined){
      return response.status(400).json()
    }

    if(body.likes === undefined){
      blog = new Blog({
        title: body.title,
        author: body.author,
        likes: 0,
        user: user.id
      })
    } else{
      blog = new Blog({
        title: body.title,
        author: body.author,
        likes: body.likes,
        user: user.id
      })
    }
   
      const savedBlog = await blog.save()
      if(user !== null){
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()
      }
      response.status(201).json(savedBlog.toJSON())
    }catch(exception){
      next(exception)
    }
})


module.exports = blogsRouter