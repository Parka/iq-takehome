
import IQuestion from '@/types/Question';
import * as React from 'react';

interface IQuestionProps extends IQuestion {
}

const Question: React.FunctionComponent<IQuestionProps> = (props) => {
  return <p>{props.title}</p>;
};

export default Question;
