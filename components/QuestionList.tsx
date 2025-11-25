import * as React from 'react';
import QuestionItem from './QuestionItem';
import IQuestion from '@/types/Question';
import ISearch from '@/types/Search';

interface IQuestionsProps {
  search: URLSearchParams
}

const QuestionList: React.FunctionComponent<IQuestionsProps> = async ({ search }) => {
  const searchParams = new URLSearchParams(search)
  const data = await fetch(`${process.env.__NEXT_PRIVATE_ORIGIN}/api/questions?${searchParams}`)
  const questions: IQuestion[] = await data.json()

  return (
    <section>
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
