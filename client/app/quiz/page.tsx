import AllQuestions from '@/components/AllQuestions'

export type Question = {
  id: string
  question: string
  options: string[]
}

export const BASE_URL = process.env.BACKEND_URL || 'http://localhost:3500'

export default async function Quiz() {
  const res = await fetch(`${BASE_URL}/questions`)
  const questions: Question[] = await res.json()

  return <AllQuestions questions={questions} />
}
