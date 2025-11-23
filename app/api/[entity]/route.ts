import IQuestion from '@/types/Question'
import questionsCSV from './q-trunc.csv'
import Papa from 'papaparse'

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
const RESPONSES: Record<string, any> = {
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

interface IParams {
  params: {
    entity: string
  }
}

export async function GET(req: Request, { params }: IParams) {
  const { entity } = await params
  return Response.json(RESPONSES[entity])
}