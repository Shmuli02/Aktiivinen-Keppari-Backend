const { model, modelNames } = require('mongoose')

require ('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URL = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URL
  : process.env.MONGODB_URL
const SECRET = process.env.SECRET
const AWS_ACCESS_ID = process.env.AWS_ACCESS_ID
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWS_REGION = process.env.AWS_REGION

module.exports = {
  PORT,
  MONGODB_URL,
  SECRET,
  AWS_ACCESS_ID,
  AWS_ACCESS_KEY,
  AWS_BUCKET_NAME,
  AWS_REGION
}