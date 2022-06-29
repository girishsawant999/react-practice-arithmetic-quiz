import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTestStateForWindow } from '../../redux/actions';
import { RootState } from '../../redux/reducer';
import { TQuestionObj } from '../../types';
import TestInformation from './TestInformation';
import When from './When';

type TProps = {
  windowNo: number;
};

const TIME_PER_QUESTION = 5;

const TestWindow = ({ windowNo }: TProps) => {
  const [testStarted, setTestStarted] = useState(false);
  const [currentQueNo, setCurrentQueNo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

  const answerInputRef = React.createRef<HTMLInputElement>();

  useEffect(() => {
    if (testStarted) {
      const timerInterval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [testStarted]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeLeft(TIME_PER_QUESTION);
      onSubmitAnswer(true);
    }
  }, [timeLeft]);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { testConfigData } = state as RootState;
  const windowTestData = (state as any)[`testWindow-${windowNo}`];
  const { questionsCount, operandsRange } = testConfigData || {};

  console.log('windowTestData', windowTestData);

  const getRandomInt = (max: number, min = 1) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomOperator = () => {
    const operators = ['+', '-', '*', '/'];
    return operators[getRandomInt(operators.length)];
  };

  const calculateAnswer = (operator: string, operand1: number, operand2: number) => {
    switch (operator) {
      case '+':
        return operand1 + operand2;
      case '-':
        return operand1 - operand2;
      case '*':
        return operand1 * operand2;
      case '/':
        return +(operand1 / operand2).toFixed(2);
      default:
        return 0;
    }
  };

  const createQuestionObj = () => {
    const operand1 = getRandomInt(operandsRange || 10);
    const operand2 = getRandomInt(operandsRange || 10);
    const operator = getRandomOperator();
    const answer = calculateAnswer(operator, operand1, operand2);
    return { operand1, operand2, operator, answer, isCorrect: false };
  };

  const [currentQueObj, setCurrentQueObj] = useState<TQuestionObj>(createQuestionObj());

  const dispatchWindowUpdate = (answer?: number) => {
    dispatch(
      updateTestStateForWindow({
        windowNo,
        currentQuestionObject: {
          ...currentQueObj,
          enteredAnswer: answer,
          isCorrect: answer === currentQueObj.answer
        },
        currentQueNo
      })
    );
  };

  const onSubmitAnswer = (skip = false) => {
    if (skip) {
      dispatchWindowUpdate();
      setCurrentQueNo(currentQueNo + 1);
      setCurrentQueObj(createQuestionObj());
    }
    const _enteredAnswer = answerInputRef.current?.value;
    if (_enteredAnswer) {
      const enteredAnswer = +_enteredAnswer;
      dispatchWindowUpdate(enteredAnswer);
      answerInputRef.current.value = '';
      answerInputRef.current.focus();
      setCurrentQueNo(currentQueNo + 1);
      setCurrentQueObj(createQuestionObj());
    }
    if (questionsCount && currentQueNo >= questionsCount - 1) {
      setTestStarted(false);
      setCurrentQueNo(0);
    }
  };

  const getTotalCorrectAnswered = () => {
    if (windowTestData && windowTestData.questions) {
      const correctAnswers = Object.values(windowTestData.questions).filter(
        (que: any) => que.isCorrect
      );
      return correctAnswers.length;
    }
  };

  return (
    <>
      <When condition={!testStarted && !windowTestData}>
        <div className="flex flex-col justify-center items-center w-full  border border-white h-full">
          <TestInformation windowNo={windowNo} questionsCount={questionsCount || 0} />
          <button
            onClick={() => setTestStarted(true)}
            className="text-white px-4 py-2 border-white border rounded-md hover:bg-white hover:text-black hover:scale-95 transition-colors"
          >
            Start test
          </button>
        </div>
      </When>
      <When condition={!testStarted && windowTestData}>
        <div className="flex flex-col justify-center items-center w-full  border border-white h-full">
          <div className="test-window-info flex flex-col justify-center items-center p-2">
            <h1 className="text-white text-4xl mb-1">Test Window - {windowNo} Results</h1>
            <p className="text-white">Total Questions - {questionsCount}</p>
            <p className="text-white">Correctly Answered - {getTotalCorrectAnswered()}</p>
            <button
              onClick={() => setTestStarted(true)}
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
                          {que.enteredAnswer || '-'}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </When>
      <When condition={testStarted}>
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
                type="text"
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
      </When>
    </>
  );
};

export default TestWindow;
