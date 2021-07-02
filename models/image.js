const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  src: {type: String},
  thumbnail: {type: String},
  thumbnailWidth: {type: Number},
  thumbnailHeight: {type: Number}
})

imageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Image', imageSchema)