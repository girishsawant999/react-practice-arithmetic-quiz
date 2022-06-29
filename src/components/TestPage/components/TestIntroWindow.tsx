import React from 'react';
import TestInformation from '../../commonComponents/TestInformation';
import When from '../../commonComponents/When';

type TProps = {
  windowNo: number;
  showResumeTest: boolean;
  onResumeTest: () => void;
  onStartTest: () => void;
  onResetTest: () => void;
};

const TestIntroWindow = ({
  windowNo,
  showResumeTest,
  onResumeTest,
  onStartTest,
  onResetTest
}: TProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full  border border-white h-full">
      <TestInformation windowNo={windowNo} />
      <When condition={!showResumeTest}>
        <button
          onClick={onStartTest}
          className="text-white px-4 py-2 border-white border rounded-md hover:bg-white hover:text-black hover:scale-95 transition-colors"
        >
          Start test
        </button>
      </When>
      <When condition={showResumeTest}>
        <div className="flex">
          <button
            onClick={onResumeTest}
            className="text-white mx-2 px-4 py-2 border-white border rounded-md hover:bg-white hover:text-black hover:scale-95 transition-colors"
          >
            Resume test
          </button>
          <button
            onClick={onResetTest}
            className="text-white mx-2 px-4 py-2 border-white border rounded-md hover:bg-white hover:text-black hover:scale-95 transition-colors"
          >
            Reset test
          </button>
        </div>
      </When>
    </div>
  );
};

export default TestIntroWindow;
