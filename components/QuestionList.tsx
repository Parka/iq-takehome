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
    <section>
      <Sort search={search} />
      {questions.length ?
        <ul>
          {questions.map(question => <QuestionItem key={question.qid} {...question} />)}
        </ul>
        :
        <h3>No questions found</h3>
      }
    </section>
  );
};

export default QuestionList;
