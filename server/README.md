# MCQ Quiz API

This API allows you to manage multiple-choice questions (MCQs) for quizzes. You can create, retrieve, update, delete questions, and validate answers.

## API Endpoints

### Get all questions

GET /questions

Retrieves all questions with randomized options.

Example **Response**:
```json
[
  {
    "_id": "question1Id",
    "question": "What is the capital of France?",
    "options": ["Paris", "Berlin", "London", "Rome"],
    "correctAnswer": "Paris"
  },
  {
    "_id": "question2Id",
    "question": "What is 2 + 2?",
    "options": ["3", "4", "5", "6"],
    "correctAnswer": "4"
  }
]
```

### Create a new question
POST /questions

Example **Request Body**:
```json
{
  "question": "What is the capital of France?",
  "options": ["Paris", "Berlin", "London", "Rome"],
  "correctAnswer": "Paris"
}
```

### Update a question
PUT /questions/:id

Example **Request Body**:
```json
{
  "question": "What is the capital of France?",
  "options": ["Paris", "Berlin", "London", "Rome"],
  "correctAnswer": "Paris"
}
```

### DELETE a question
DELETE /questions/:id

### Validate answers
POST /questions/validate

Example **Request Body**:

```json
{
  "question1Id": "Paris",
  "question2Id": "4"
}
```

Example **Response**
```json
[
  {
    "questionId": "question1Id",
    "isCorrect": false
  },
  {
    "questionId": "question2Id",
    "isCorrect": true
  }
]
```
