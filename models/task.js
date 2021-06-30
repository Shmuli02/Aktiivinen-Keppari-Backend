const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {type: String, require: true},
  difficulty: {type: String, require: true},
  description: {type: String}
})

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Task', taskSchema)