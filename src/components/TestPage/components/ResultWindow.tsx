import React from 'react';
import { TQuestionObj } from '../../../types';

type TProps = {
  windowNo: number;
  questionsCount: number;
  onStartNewTest: () => void;
  windowTestData: {
    currentQuestionNo: number;
    questions: Array<TQuestionObj>;
  };
};

const ResultWindow = ({ windowNo, questionsCount, onStartNewTest, windowTestData }: TProps) => {
  const getTotalCorrectAnswered = () => {
    if (windowTestData && windowTestData.questions) {
      const correctAnswers = Object.values(windowTestData.questions).filter(
        (que: TQuestionObj) => que.isCorrect
      );
      return correctAnswers.length;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full  border border-white h-full">
      <div className="test-window-info flex flex-col justify-center items-center p-2">
        <h1 className="text-white text-4xl mb-1">Test Window - {windowNo} Results</h1>
        <p className="text-white">Total Questions - {questionsCount}</p>
        <p className="text-white">Correctly Answered - {getTotalCorrectAnswered()}</p>
        <button
          onClick={onStartNewTest}
          className="text-white px-4 py-2 mt-2 border-white border rounded-md hover:bg-white hover:text-black hover:scale-95 transition-colors"
        >
          Start new test
        </button>

        <hr className="bg-white text-center my-5 w-full" />

        <div className="w-full">
          <h4 className="text-white text-lg underline">Questions & Answers:</h4>
          <div className="max-h-[400px] overflow-auto">
            {windowTestData &&
              windowTestData.questions &&
              Object.values(windowTestData.questions).map((que: any, index: number) => {
                return (
                  <div key={index} className="flex flex-col">
                    <p className={`${que.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      Q{index + 1}. {que.operand1} {que.operator} {que.operand2} =&nbsp;
                      {que.enteredAnswer === undefined ? '-' : que.enteredAnswer}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultWindow;
