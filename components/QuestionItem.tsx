
import { DIFFICULTY_COLORS, PILL_COLORS } from '@/const/global';
import IDifficulty from '@/types/Difficulty';
import IQuestion from '@/types/Question';
import IType from '@/types/Type';
import * as React from 'react';

interface IQuestionProps extends IQuestion {
}

const QuestionItem: React.FunctionComponent<IQuestionProps> = async (props) => {
  const typesResponse = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/types`)
  const types: IType[] = await typesResponse.json()
  const type = types.find(type => type.value === props.type)

  const difficultiesResponse = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/difficulties`)
  const difficulties: IDifficulty[] = await difficultiesResponse.json()
  const difficulty = difficulties.find(difficulty => difficulty.id === props.difficulty)

  return (
    <li className='
      grid grid-flow-row grid-cols-1
      sm:grid-cols-2 sm:grid-rows-4
      md:grid-cols-18 md:grid-rows-1
      even:bg-gray-100 odd:bg-gray-200
      dark:even:bg-gray-700 dark:odd:bg-gray-800
      hover:bg-blue-200 hover:dark:bg-blue-950
      space-x-5 p-5 my-2 rounded-lg
      transition delay-100
      scale-100 hover:scale-105
      shadow-none hover:shadow-lg dark:shadow-gray-950
    '>
      <span className='font-bold md:col-span-4'>{props.qid}. {props.title}</span>
      <div className='
        flex items-start space-x-3
        sm:col-start-2
        md:col-span-3 md:col-start-auto
      '>
        <span className='md:hidden'>Difficulty:</span>
        <span className={`
          col-span-2
          ${DIFFICULTY_COLORS[(difficulty?.id || 1) - 1]}
          px-3 rounded-full
          font-bold
        `}>
          {difficulty?.value}
        </span>
      </div>
      <div className='
        flex items-start space-x-3
        sm:col-start-2 md:col-span-3 md:col-start-auto
      '>
        <span className='md:hidden'>Type:</span>
        <span className={`
          ${PILL_COLORS[type?.id || 0]}
          px-3 rounded-full text-center wrap-anywhere
        `}>
          {props.type}
        </span>
      </div>
      <div className='
        flex items-start space-x-3
        sm:col-start-2
        md:col-start-auto
      '>
        <span className='md:hidden'>Votes:</span>
        <span>{props.sum}</span>
      </div>
      <span className='
        col-start-1 row-start-2 pb-12
        sm:row-start-2 sm:row-span-3 sm:pb-0
        md:col-span-4 md:col-start-auto md:row-start-auto md:row-span-auto'
      >
        {props.question_summary}
      </span>
      <a className='
          wrap-anywhere text-blue-400
          visited:text-purple-400
          sm:col-start-2
          md:col-span-3 md:col-start-auto
        '
        href={`https://www.linkedin.com/search/results/companies/?keywords=${props.company_asked}`}
        target='_blank'
      >
        {props.company_asked}
      </a>
    </li>
  );
};

export default QuestionItem;
