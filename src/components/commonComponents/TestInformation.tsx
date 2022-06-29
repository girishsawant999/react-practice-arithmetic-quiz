import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';

type Tprops = {
  windowNo: number;
  showSmall?: boolean;
};

const TestInformation = ({ windowNo, showSmall }: Tprops) => {
  const state = useSelector((state) => state);

  const { testConfigData, highestScore } = state as RootState;
  const { questionsCount } = testConfigData || {};

  if (showSmall) {
    return (
      <div className="flex flex-col">
        <h2 className="text-white font-bold text-2xl">Test Window - {windowNo}</h2>
        <div className="flex flex-col w-full justify-between">
          <span className="text-white text-lg">{questionsCount} questions</span>
          <span className="text-white text-lg">Highest Score: {highestScore}</span>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="test-window-info flex flex-col justify-center items-center p-2">
        <h1 className="text-white text-4xl mb-1">Test Window - {windowNo}</h1>
        <p className="text-white">Total Questions - {questionsCount}</p>
        <span className="text-white text-lg">Highest Score: {highestScore}</span>
      </div>
    </>
  );
};

export default TestInformation;
