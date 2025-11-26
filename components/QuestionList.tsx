import * as React from 'react';
import QuestionItem from './QuestionItem';
import IQuestion from '@/types/Question';
import Sort from './Sort';

interface IQuestionsProps {
  search: URLSearchParams
}

const QuestionList: React.FunctionComponent<IQuestionsProps> = async ({ search }) => {
  const searchParams = new URLSearchParams(search)
  const data = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/questions?${searchParams}`)
  const questions: IQuestion[] = await data.json()

  return (
    <section className='w-full'>
      <Sort search={search} />
      {questions.length ?
        <ul>
          <li className='
            font-bold
            hidden md:grid
            grid-cols-18 grid-rows-1
            bg-amber-100 dark:bg-amber-900
            space-x-5 p-5 my-2 rounded-sm
            shadow-sm dark:shadow-gray-950
          '>
            <span className='col-span-4'>Name</span>
            <div className='col-span-3'>
              Difficulty
            </div>
            <div className='col-span-3'>
              Type
            </div>
            <span className='flex justify-end'>
              Votes
            </span>
            <span className='col-span-4'>
              Summary
            </span>
            <div className=''>
              Company
            </div>
          </li>
          {questions.map(question => <QuestionItem key={question.qid} {...question} />)}
        </ul>
        :
        <h3>No questions found</h3>
      }
    </section>
  );
};

export default QuestionList;
