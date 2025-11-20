import questionsCSV from './q-trunc.csv'
import Papa from 'papaparse'

const cutAtParenthesis = (header: string): string => {
    let parenthesis = header.indexOf("(")
    return parenthesis < 0 ?
        header :
        header.slice(0, parenthesis)
}

const questions = Papa.parse(questionsCSV,
    {
        header: true,
        transformHeader: cutAtParenthesis,
        dynamicTyping: true,
    })
    .data

export async function GET(req: Request) {
    return Response.json(questions)
}