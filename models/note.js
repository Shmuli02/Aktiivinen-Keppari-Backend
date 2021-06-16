const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  task : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  url : {type: String, require: false},
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Note', noteSchema)