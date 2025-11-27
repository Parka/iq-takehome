
import IDifficulty from '@/types/Difficulty';
import IQuestion from '@/types/Question';
import IType from '@/types/Type';
import * as React from 'react';
import QuestionItemClient from './QuestionItemClient';
import { Badge } from './ui/badge';

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
    <QuestionItemClient id={props.qid}>
      <span className='font-bold md:col-span-4'>{props.qid}. {props.title}</span>
      <div className='
        flex items-start space-x-3
        sm:col-start-2
        md:col-start-auto md:col-span-2
      '>
        <span className='md:hidden'>Difficulty:</span>
        <Badge className={`col-span-2 px-3 font-bold`}>
          {difficulty?.value}
        </Badge>
      </div>
      <div className='
        flex items-start space-x-3
        sm:col-start-2
        md:col-start-auto md:col-span-4
      '>
        <span className='md:hidden'>Type:</span>
        <Badge className={`px-3 text-center`}>
          {props.type}
        </Badge>
      </div>
      <div className='
        flex items-start space-x-3
        sm:col-start-2
        md:col-start-auto
      '>
        <span className='md:hidden'>Votes:</span>
        <span>{props.sum}</span>
      </div>
      <a className='
          wrap-anywhere text-blue-400
          visited:text-purple-400
          sm:col-start-1 sm:row-start-2
          md:col-span-3 md:col-start-auto md:row-start-auto
        '
        href={`https://www.linkedin.com/search/results/companies/?keywords=${props.company_asked}`}
        target='_blank'
      >
        {props.company_asked}
      </a>
    </QuestionItemClient>
  );
};

export default QuestionItem;
