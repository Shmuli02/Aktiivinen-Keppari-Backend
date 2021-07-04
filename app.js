const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const path = require('path');
const nodemailer = require("nodemailer");
require("dotenv").config();

const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const taskRouter = require('./controllers/tasks')
const noteRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const uploadRouter = require('./controllers/upload')
const emailRouter = require('./controllers/emailer')
const imageRouter = require('./controllers/images')



logger.info('connecting to', config.MONGODB_URL)

mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
  })



app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json())
app.use(middleware.requestLogger)



app.use('/api/blogs',blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login',loginRouter)
app.use('/api/tasks', taskRouter)
app.use('/api/notes', noteRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/email', emailRouter)
app.use('/api/images',imageRouter)

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app