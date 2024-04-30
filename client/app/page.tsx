import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Quiz App</h1>
      <Link
        href="/quiz"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Start Quiz
      </Link>
    </div>
  )
}
