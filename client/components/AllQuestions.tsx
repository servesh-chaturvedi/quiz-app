'use client'
import { useState } from 'react'
import { Question, BASE_URL } from '@/app/quiz/page'

type Answer = {
  questionId: string
  isCorrect: boolean
}

export default function AllQuestions({ questions }: { questions: Question[] }) {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})
  const [result, setResult] = useState<Answer[]>([])
  const [correct, setCorrect] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }))
  }

  const handleSubmit = async () => {
    const res = await fetch(`${BASE_URL}/questions/validate`, {
      method: 'POST',
      body: JSON.stringify(answers),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const fetchedResults: Answer[] = await res.json()
    setResult(fetchedResults)

    const correctAnswers = fetchedResults.reduce((acc, answer) => {
      if (answer.isCorrect) {
        acc++
      }
      return acc
    }, 0)
    setCorrect(correctAnswers)
    setIsSubmitted(true)
  }

  return (
    <>
      <div className="container md:max-w-[20rem] mx-auto">
        <h1 className="text-3xl font-bold my-8">Quiz</h1>
        {questions.map((question) => (
          <SingleQuestion
            key={question.id}
            question={question}
            answers={answers}
            setAnswer={handleAnswerChange}
            result={result}
          />
        ))}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
        >
          Validate
        </button>
        <button
          onClick={() => {
            setAnswers({})
            setIsSubmitted(false)
            setCorrect(0)
            setResult([])
          }}
          className="mx-2 hover:bg-red-400 text-white font-bold py-2 px-4 rounded my-4"
        >
          Reset
        </button>
        {isSubmitted && (
          <p className="text-xl text-center">
            You got <strong>{correct}</strong> out of{' '}
            <strong>{questions.length}</strong> answers right!
          </p>
        )}
      </div>
    </>
  )
}

function SingleQuestion({
  question,
  answers,
  setAnswer,
  result,
}: {
  question: Question
  answers: { [key: string]: string }
  setAnswer: (questionId: string, answer: string) => void
  result: Answer[]
}) {
  const answerResult = result.find((ans) => ans.questionId === question.id)
  const isCorrect = answerResult ? answerResult.isCorrect : null

  return (
    <div key={question.id} className="my-8">
      <p className="font-bold">{question.question}</p>
      {question.options.map((option) => (
        <label
          key={option}
          className={`p-1 block my-2 border border-transparent has-[:checked]:border-blue-200 ${
            isCorrect === null
              ? ''
              : isCorrect
              ? 'has-[:checked]:border-green-400'
              : 'has-[:checked]:border-red-400'
          }`}
        >
          <input
            type="radio"
            name={question.id}
            value={option}
            onChange={() => setAnswer(question.id, option)}
            checked={option === answers[question.id]}
            className="mr-2"
          />
          {option}
        </label>
      ))}
    </div>
  )
}
