const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username : {type : String, unique : true},
  firstname : {type: String},
  lastname: {type: String},
  email: {type: String},
  passwordHash : {type: String},
  diploma: {type: String},
  notes : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Note'
  }]
  
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User