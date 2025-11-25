
import { DIFFICULTY_COLORS, PILL_COLORS } from '@/const/global';
import IDifficulty from '@/types/Difficulty';
import IQuestion from '@/types/Question';
import IType from '@/types/Type';
import * as React from 'react';

interface IQuestionProps extends IQuestion {
}

const QuestionItem: React.FunctionComponent<IQuestionProps> = async (props) => {
  const typesResponse = await fetch(`${process.env.__NEXT_PRIVATE_ORIGIN}/api/types`)
  const types: IType[] = await typesResponse.json()
  const type = types.find(type => type.value === props.type)

  const difficultiesResponse = await fetch(`${process.env.__NEXT_PRIVATE_ORIGIN}/api/difficulties`)
  const difficulties: IDifficulty[] = await difficultiesResponse.json()
  const difficulty = difficulties.find(difficulty => difficulty.id === props.difficulty)

  return (
    <li className='grid grid-flow-col auto-cols-fr justify-center
      even:bg-gray-100 odd:bg-gray-200
      dark:even:bg-gray-700 dark:odd:bg-gray-800
      hover:bg-blue-200 hover:dark:bg-blue-950
      space-x-5 p-5 my-2 rounded-lg
      transition delay-100
      scale-100 hover:scale-105
      shadow-none hover:shadow-lg dark:shadow-gray-950
    '>
      <span className='font-bold col-span-4'>{props.qid}. {props.title}</span>
      <div className='flex items-start col-span-3'>
        <span className={`
          col-span-2
          ${DIFFICULTY_COLORS[(difficulty?.id || 1) - 1]}
          px-3 rounded-full
          font-bold
        `}>
          {difficulty?.value}
        </span>
      </div>
      <div className='flex items-start col-span-3'>
        <span className={`
          ${PILL_COLORS[type?.id || 0]}
          px-3 rounded-full text-center wrap-anywhere
        `}>
          {props.type}
        </span>
      </div>
      <span>{props.sum}</span>
      <span className='col-span-3'>{props.question_summary}</span>
      <a className='col-span-2 wrap-anywhere text-blue-400 visited:text-purple-400' href={`https://www.linkedin.com/search/results/companies/?keywords=${props.company_asked}`} target='_blank'>{props.company_asked}</a>
    </li>
  );
};

export default QuestionItem;
