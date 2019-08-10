
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')



describe('add users to db', () => {
  
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'daniel',
      name: 'Daniel Walder',
      password: 'walder',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    console.log(usersAtEnd)
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with an invalid username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'da',
      name: 'Daniel Walder',
      password: 'walder',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(500)
    
      
    const usersAtEnd = await helper.usersInDb()
    console.log(usersAtEnd)
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })


  afterAll(async () => {
    mongoose.connection.close()
  })
})