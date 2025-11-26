import BackButton from '@/components/BackButton';
import { DIFFICULTY_COLORS, PILL_COLORS } from '@/const/global';
import IDifficulty from '@/types/Difficulty';
import IQuestion from '@/types/Question';
import IType from '@/types/Type';
import * as React from 'react';

interface IPageProps {
  params: Promise<{ questionId: string }>
}

const Page: React.FunctionComponent<IPageProps> = async ({ params }) => {
  const { questionId } = await params
  const data = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/questions/${questionId}`)
  const question: IQuestion = await data.json()

  const typesResponse = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/types`)
  const types: IType[] = await typesResponse.json()
  const type = types.find(type => type.value === question.type)

  const difficultiesResponse = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/difficulties`)
  const difficulties: IDifficulty[] = await difficultiesResponse.json()
  const difficulty = difficulties.find(difficulty => difficulty.id === question.difficulty)

  return (
    <div className={`
      flex min-h-screen items-center justify-center
      bg-zinc-50 font-sans dark:bg-gray-950
    `}>
      <main className={`
        flex min-h-screen w-full max-w-5xl flex-col items-center space-y-6
        bg-white dark:bg-gray-900
        py-8 px-4 
        sm:py-32 sm:px-16 sm:items-start
        `}>
        <BackButton />
        <div className='
          w-full grid grid-flow-row grid-cols-1
          sm:grid-cols-2 sm:grid-rows-4 sm:space-y-4
          bg-gray-200 
          dark:bg-gray-700 
          space-x-5 p-5 my-2 rounded-lg
          shadow-lg dark:shadow-gray-950
      '>
          <span className='font-bold'>{question.qid}. {question.title}</span>
          <div className='
            flex items-start space-x-3
            sm:col-start-2
          '>
            <span>Difficulty:</span>
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
            sm:col-start-2
          '>
            <span>Type:</span>
            <span className={`
              ${PILL_COLORS[type?.id || 0]}
              px-3 rounded-full text-center wrap-anywhere
            `}>
              {question.type}
            </span>
          </div>
          <div className='
            flex items-start space-x-3
            sm:col-start-2
          '>
            <span>Votes:</span>
            <span>{question.sum}</span>
          </div>
          <span className='
            col-start-1 row-start-2 pb-12
            sm:row-start-2 sm:row-span-3 sm:pb-0
          '
          >
            {question.question_summary}
          </span>
          <a className='
              wrap-anywhere text-blue-400
              visited:text-purple-400
              sm:col-start-2
            '
            href={`https://www.linkedin.com/search/results/companies/?keywords=${question.company_asked}`}
            target='_blank'
          >
            {question.company_asked}
          </a>
        </div>
      </main>
    </div>
  );
};

export default Page;
