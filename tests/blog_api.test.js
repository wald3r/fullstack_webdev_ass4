const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')


beforeEach(async () => {

    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
    await Blog.deleteMany({})

    for(let a = 0; a < helper.initialBlogs.length; a++){
        let blog = new Blog(helper.initialBlogs[a])
        await blog.save()
    }
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
                              .expect('Content-Type', /application\/json/)
    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('verify blog likes', async () => {
    const blogWithoutLikes = {
                                 title: 'Blogtest5',
                                 author: 'Author5',
                                 url: 'test',
                             }

    const token = await helper.createToken()
    await api  
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token) 
        .send(blogWithoutLikes)
        .expect(201)

    const response = await api.get('/api/blogs')
                              .expect('Content-Type', /application\/json/)
    

    expect(response.body[0].likes).toBe(1)
    expect(response.body[1].likes).toBe(2)
    expect(response.body[2].likes).toBe(3)
    expect(response.body[3].likes).toBe(4)
    expect(response.body[4].likes).toBe(0)
})

test('verify title and url', async () => {
    const blogWithoutUrlandTitle = {
                                 author: 'Author5',
                             }

    const token = await helper.createToken()   

    await api  
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token) 
        .send(blogWithoutUrlandTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/)

})

test('delete blog', async () => {

    await helper.addBlogWithUser()
    const token = await helper.createToken() 

    const response = await api.get('/api/blogs')
    await api  
        .delete(`/api/blogs/${response.body[4].id}`)
        .set('Authorization', 'bearer ' + token)
        .expect(204)

    const secResponse = await api.get('/api/blogs')
    expect(secResponse.body).not.toContain(response.body[4].id)

})

test('update blog', async () => {

    const response = await api.get('/api/blogs')
    const newBlog = {
        author: response.body[0].author,
        title: response.body[0].title,
        likes: 200,
        url: response.body[0].url
    }

    await api  
        .put(`/api/blogs/${response.body[0].id}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)


    const secResponse = await api.get('/api/blogs')
    expect(secResponse.body[0].likes).toBe(200)
    expect(secResponse.body[0].likes).not.toBe(response.body[0].likes)

})



test('verify id definition', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})


test('post blog', async () => {
    const blog = new Blog({
        title: 'Blogtest5',
        likes: 5,
        url: 'test',
        author: 'Author5'
    })

    const token = await helper.createToken() 
    await api  
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token) 
            .send(blog)
            .expect(201)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length+1)
    expect(response.body[4].title).toBe(blog.title)
})

afterAll(() => {
    mongoose.connection.close()
  })