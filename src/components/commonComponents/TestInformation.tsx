import React from 'react';

type Tprops = {
  windowNo: number;
  questionsCount: number;
  showSmall?: boolean;
};

const TestInformation = ({ windowNo, questionsCount, showSmall }: Tprops) => {
  if (showSmall) {
    return (
      <div className="flex flex-col">
        <h2 className="text-white font-bold text-2xl">Test Window - {windowNo}</h2>
        <span className="text-white text-lg">{questionsCount} questions</span>
      </div>
    );
  }
  return (
    <>
      <div className="test-window-info flex flex-col justify-center items-center p-2">
        <h1 className="text-white text-4xl mb-1">Test Window - {windowNo}</h1>
        <p className="text-white">Total Questions - {questionsCount}</p>
      </div>
    </>
  );
};

export default TestInformation;
