# MCQ Quiz API

This API allows you to manage multiple-choice questions (MCQs) for quizzes. You can create, retrieve, update, delete questions, and validate answers.

## Getting started

Create a `.env` file in server directory and set an environment variable `DATABASE_URI=<mongo db url>`

Run the development server:

```bash
npm i
npm run dev
```

Create a few questions using the post question api as described in next section.

## API Endpoints

### Get all questions

GET /questions

Retrieves all questions with randomized options.

Example **Response**:

```json
[
  {
    "id": "question1Id",
    "question": "What is the capital of France?",
    "options": ["London", "Rome", "Berlin", "Paris"]
  },
  {
    "id": "question2Id",
    "question": "What is 2 + 2?",
    "options": ["3", "4", "5", "6"]
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
