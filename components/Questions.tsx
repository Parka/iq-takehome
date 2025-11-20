import * as React from 'react';
import Question from './Question';
import IQuestion from '@/types/Question';

interface IQuestionsProps {
}

const Questions: React.FunctionComponent<IQuestionsProps> = async (props) => {
    const data = await fetch(`${process.env.__NEXT_PRIVATE_ORIGIN}/api/questions`)
    const questions: IQuestion[] = await data.json()

    return (
        <section>
            {questions.map(question => <Question key={question.qid} {...question}/>)}
        </section>
    );
};

export default Questions;
