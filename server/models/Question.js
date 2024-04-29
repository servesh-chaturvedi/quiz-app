const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [
      {
        type: String,
        required: true,
      },
    ],
    validate: [arrayLimit, '{PATH} must contain at least two options'],
  },
  correctAnswer: {
    type: String,
    required: true,
  },
})

function arrayLimit(val) {
  return val.length >= 2
}

// Custom validator to ensure correctAnswer is one of the options
questionSchema.path('correctAnswer').validate(function (value) {
  const options = this.options
  return options.includes(value)
}, 'Correct answer must be one of the options')

module.exports = mongoose.model('Question', questionSchema)
