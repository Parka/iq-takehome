'use client'
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Item } from './ui/item';

interface IQuestionItemClientProps {
  id: number
  children: React.ReactNode
}

const QuestionItemClient: React.FunctionComponent<IQuestionItemClientProps> = ({ children, id }) => {
  const router = useRouter()

  return (
    <Item className='
      cursor-pointer
      grid grid-flow-row grid-cols-1
      sm:grid-cols-2 sm:grid-rows-3
      md:grid-cols-14 md:grid-rows-1
      even:bg-gray-100 odd:bg-gray-200
      dark:even:bg-gray-700 dark:odd:bg-gray-800
      hover:bg-blue-200 hover:dark:bg-blue-950
      space-x-5 p-5 my-2 rounded-lg
      transition delay-100
      scale-100 hover:scale-105
      shadow-none hover:shadow-lg dark:shadow-gray-950
    '
      onClick={() => {
        router.push(`./${id}`)
      }}
    >
      {children}
    </Item>
  );
};

export default QuestionItemClient;
