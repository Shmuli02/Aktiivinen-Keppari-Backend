const { model, modelNames } = require('mongoose')

require ('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URL = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URL
  : process.env.MONGODB_URL
const SECRET = process.env.SECRET
const REACT_APP_ACCESS_ID = process.env.REACT_APP_ACCESS_ID
const REACT_APP_ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY
const REACT_APP_BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME
const REACT_APP_REGION = process.env.REACT_APP_REGION

module.exports = {
  PORT,
  MONGODB_URL,
  SECRET,
  REACT_APP_ACCESS_ID,
  REACT_APP_ACCESS_KEY,
  REACT_APP_BUCKET_NAME,
  REACT_APP_REGION
}