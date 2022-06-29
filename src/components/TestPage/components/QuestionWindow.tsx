import React from 'react';
import { TQuestionObj } from '../../../types';
import TestInformation from '../../commonComponents/TestInformation';

type TProps = {
  windowNo: number;
  questionsCount: number;
  currentQueNo: number;
  timeLeft: number;
  answerInputRef: React.RefObject<HTMLInputElement>;
  currentQueObj: TQuestionObj;
  onSubmitAnswer: () => void;
};

const QuestionWindow = ({
  windowNo,
  questionsCount,
  currentQueNo,
  timeLeft,
  answerInputRef,
  currentQueObj,
  onSubmitAnswer
}: TProps) => {
  return (
    <div className="flex flex-col p-4 w-full  border border-white h-full">
      <TestInformation showSmall windowNo={windowNo} questionsCount={questionsCount || 0} />

      <hr className="bg-white text-center my-5 w-full" />

      <div className="question">
        <div className="flex">
          <h3 className="text-white text-xl mb-1 flex-grow">Question - {currentQueNo + 1}</h3>
          <span className="text-white text-lg">Time Left: {timeLeft} Seconds</span>
        </div>
        <div className="ml-2 text-center">
          <p className="text-white mb-4 text-2xl">
            {currentQueObj.operand1} {currentQueObj.operator} {currentQueObj.operand2} = ?
          </p>
          <input
            ref={answerInputRef}
            className="mb-4 p-2 focus:outline-none rounded-md text-center"
            type="number"
            name="answer"
            id="answer"
            autoComplete="off"
          />
          <br />
          <div className="text-center">
            <button
              onClick={() => onSubmitAnswer()}
              className="text-white mx-1 px-4 py-2 border-white border rounded-md hover:bg-white hover:text-black hover:scale-95 transition-colors"
            >
              Submit Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionWindow;
