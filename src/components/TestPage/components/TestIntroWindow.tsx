import React from 'react';
import TestInformation from '../../commonComponents/TestInformation';
import When from '../../commonComponents/When';

type TProps = {
  windowNo: number;
  questionsCount: number;
  showResumeTest: boolean;
  onResumeTest: () => void;
  onStartTest: () => void;
};

const TestIntroWindow = ({
  windowNo,
  questionsCount,
  showResumeTest,
  onResumeTest,
  onStartTest
}: TProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full  border border-white h-full">
      <TestInformation windowNo={windowNo} questionsCount={questionsCount || 0} />
      <When condition={!showResumeTest}>
        <button
          onClick={onStartTest}
          className="text-white px-4 py-2 border-white border rounded-md hover:bg-white hover:text-black hover:scale-95 transition-colors"
        >
          Start test
        </button>
      </When>
      <When condition={showResumeTest}>
        <button
          onClick={onResumeTest}
          className="text-white px-4 py-2 border-white border rounded-md hover:bg-white hover:text-black hover:scale-95 transition-colors"
        >
          Resume test
        </button>
      </When>
    </div>
  );
};

export default TestIntroWindow;
