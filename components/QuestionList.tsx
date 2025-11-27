import * as React from 'react';
import QuestionItem from './QuestionItem';
import IQuestion from '@/types/Question';
import Sort from './Sort';
import { Item, ItemGroup } from './ui/item';

interface IQuestionsProps {
  search: string
}

const QuestionList: React.FunctionComponent<IQuestionsProps> = async ({ search }) => {
  const searchParams = new URLSearchParams(search)
  const data = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/questions?${searchParams}`)
  const questions: IQuestion[] = await data.json()

  return (
    <section className='w-full'>
      <Sort />
      {questions.length ?
        <ItemGroup>
          <Item className='
            font-bold
            hidden md:grid
            grid-cols-14 grid-rows-1
            bg-white dark:bg-amber-900
            space-x-5 p-5 my-2 rounded-sm
            shadow-sm dark:shadow-gray-950
          '>
            <span className='col-span-4'>Name</span>
            <div className='col-span-2'>
              Difficulty
            </div>
            <div className='col-span-4'>
              Type
            </div>
            <span className='flex justify-center'>
              Votes
            </span>
            <div className='col-span-3'>
              Company
            </div>
          </Item>
          {questions.map(question => <QuestionItem key={question.qid} {...question} />)}
        </ItemGroup>
        :
        <h3>No questions found</h3>
      }
    </section>
  );
};

export default QuestionList;
