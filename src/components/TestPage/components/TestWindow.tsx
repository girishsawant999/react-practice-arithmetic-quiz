import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTestStateForWindow } from '../../../redux/actions';
import { RootState } from '../../../redux/reducer';
import { TQuestionObj } from '../../../types';
import QuestionWindow from './QuestionWindow';
import ResultWindow from './ResultWindow';
import TestIntroWindow from './TestIntroWindow';
import When from '../../commonComponents/When';

type TProps = {
  windowNo: number;
};

const TIME_PER_QUESTION = 20;

const TestWindow = ({ windowNo }: TProps) => {
  const [testStarted, setTestStarted] = useState(false);
  const [currentQueNo, setCurrentQueNo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [showResumeTest, setShowResumeTest] = useState(false);

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

  useEffect(() => {
    setTimeLeft(TIME_PER_QUESTION);
  }, [currentQueNo]);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { testConfigData } = state as RootState;
  const windowTestData = (state as any)[`testWindow-${windowNo}`];
  const { questionsCount, operandsRange } = testConfigData || {};

  const getRandomInt = (max: number, min = 1) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomOperator = () => {
    const operators = ['+', '-', '*', '/'];
    return operators[getRandomInt(operators.length - 1)];
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
    }
  };

  useEffect(() => {
    if (
      currentQueNo === 0 &&
      windowTestData &&
      windowTestData.currentQuestionNo &&
      questionsCount &&
      windowTestData.currentQuestionNo < questionsCount
    ) {
      setShowResumeTest(true);
    }
  }, [currentQueNo, windowTestData, questionsCount]);

  const onResumeTest = () => {
    setCurrentQueNo(windowTestData.currentQuestionNo);
    setShowResumeTest(false);
    setTestStarted(true);
  };

  const onStartTest = () => {
    setCurrentQueNo(0);
    setCurrentQueObj(createQuestionObj());
    setTestStarted(true);
  };

  const onStartNewTest = () => {
    dispatch(updateTestStateForWindow({ windowNo, clearWindow: true }));
    setTimeLeft(TIME_PER_QUESTION);
    setCurrentQueNo(0);
    setCurrentQueObj(createQuestionObj());
    setTestStarted(true);
  };

  return (
    <>
      <When
        condition={
          !testStarted &&
          questionsCount &&
          (!windowTestData || windowTestData.currentQuestionNo < questionsCount)
        }
      >
        <TestIntroWindow
          onResumeTest={onResumeTest}
          onStartTest={onStartTest}
          onResetTest={onStartNewTest}
          showResumeTest={showResumeTest}
          windowNo={windowNo}
        />
      </When>

      <When
        condition={
          !testStarted &&
          windowTestData &&
          questionsCount &&
          windowTestData.currentQuestionNo >= questionsCount
        }
      >
        <ResultWindow
          windowNo={windowNo}
          onStartNewTest={onStartNewTest}
          windowTestData={windowTestData}
        />
      </When>

      <When condition={testStarted}>
        <QuestionWindow
          windowNo={windowNo}
          currentQueObj={currentQueObj}
          answerInputRef={answerInputRef}
          onSubmitAnswer={onSubmitAnswer}
          currentQueNo={currentQueNo}
          timeLeft={timeLeft}
          onStartNewTest={onStartNewTest}
        />
      </When>
    </>
  );
};

export default TestWindow;
