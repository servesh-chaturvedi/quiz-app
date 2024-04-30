const Question = require('../models/Question')
const { shuffleArray } = require('../utils')

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().lean()
    const questionsWithRandomizedOptions = questions.map((question) => ({
      id: question._id,
      question: question.question,
      options: shuffleArray(question.options),
    }))
    res.json(questionsWithRandomizedOptions)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createQuestion = async (req, res) => {
  const question = new Question({
    question: req.body.question,
    options: req.body.options,
    correctAnswer: req.body.correctAnswer,
  })

  try {
    const newQuestion = await question.save()
    res.status(201).json(newQuestion)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
    if (question == null) {
      return res.status(404).json({ message: 'Question not found' })
    }
    if (req.body.question != null) {
      question.question = req.body.question
    }
    if (req.body.options != null) {
      question.options = req.body.options
    }
    if (req.body.correctAnswer != null) {
      question.correctAnswer = req.body.correctAnswer
    }
    const updatedQuestion = await question.save()
    res.json(updatedQuestion)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id)
    res.json({ message: 'Question deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const validateAnswers = async (req, res) => {
  const answers = req.body

  try {
    const questionIds = Object.keys(answers)
    const questions = await Question.find({ _id: { $in: questionIds } })

    const results = questions.map((question) => {
      const answer = answers[question._id]
      const isCorrect = question.correctAnswer === answer
      return {
        questionId: question._id,
        isCorrect,
      }
    })

    res.json(results)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  validateAnswers,
}
