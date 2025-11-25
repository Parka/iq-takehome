import IQuestion from '@/types/Question'
import questionsCSV from './q-trunc.csv'
import Papa from 'papaparse'
import { NextRequest } from 'next/server'

const cutAtParenthesis = (header: string): string => {
  let parenthesis = header.indexOf("(")
  return parenthesis < 0 ?
    header :
    header.slice(0, parenthesis)
}

const QUESTIONS = Papa.parse<IQuestion>(questionsCSV,
  {
    header: true,
    transformHeader: cutAtParenthesis,
    dynamicTyping: true,
  })
  .data


const DIFFICULTY_NAMES = ["easy", "medium", "hard"]

const RESPONSES: Record<string, any[]> = {
  questions: QUESTIONS,
  difficulties: Array.from(
    new Set(
      QUESTIONS.map(question => question.difficulty)
    )
  ).map((value) => ({ value: DIFFICULTY_NAMES[value - 1], id: value })),
  types: Array.from(
    new Set(
      QUESTIONS.map(question => question.type)
    )
  ).map((value, id) => ({ value, id })),
  companies: Array.from(
    new Set(
      QUESTIONS.map(question => question.company_asked)
    )
  ).map((value, id) => ({ value, id })),
}

const SORTERS: Record<string, (a: IQuestion, b: IQuestion) => number> = {
  difficulty: (a, b) => a.difficulty - b.difficulty,
  type: (a, b) => a.type.localeCompare(b.type),
  company: (a, b) => a.company_asked.localeCompare(b.company_asked),
}

interface IParams {
  params: Promise<{
    entity: string
  }>
}

export async function GET(req: NextRequest, { params }: IParams) {
  const searchParams = req.nextUrl.searchParams
  const { entity } = await params
  let response = RESPONSES[entity]

  if (entity === 'questions') {
    const sort = searchParams.get('sort')
    response = response.filter(entry =>
      !searchParams.getAll('difficulty').length ||
      searchParams.getAll('difficulty').includes(entry.difficulty.toString())
    ).filter(entry =>
      !searchParams.getAll('type').length ||
      searchParams.getAll('type').includes(entry.type)
    ).filter(entry =>
      !searchParams.getAll('company').length ||
      searchParams.getAll('company').includes(entry.company_asked)
    )
    if (sort) response = response.sort(SORTERS[sort])
  }

  return Response.json(response)
}