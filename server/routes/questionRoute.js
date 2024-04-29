const express = require('express')
const router = express.Router()
const questionsController = require('../controllers/questionController')

const {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  validateAnswers,
} = questionsController

router.route('/').get(getAllQuestions).post(createQuestion)
router.route('/validate').post(validateAnswers)

router.route('/:id').put(updateQuestion).delete(deleteQuestion)

module.exports = router
