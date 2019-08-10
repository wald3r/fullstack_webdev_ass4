const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const auth = require('./middleware/authentication')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')



mongoose.connect(config.DB_URI, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())
app.use(auth.getTokenFrom)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)



module.exports = app