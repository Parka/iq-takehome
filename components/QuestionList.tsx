import * as React from 'react';
import QuestionItem from './QuestionItem';
import IQuestion from '@/types/Question';

interface IQuestionsProps {
}

const QuestionList: React.FunctionComponent<IQuestionsProps> = async (props) => {
  const data = await fetch(`${process.env.__NEXT_PRIVATE_ORIGIN}/api/questions`)
  const questions: IQuestion[] = await data.json()

  return (
    <ul>
      {questions.map(question => <QuestionItem key={question.qid} {...question} />)}
    </ul>
  );
};

export default QuestionList;
