import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/reducer';
import TestWindow from './components/TestWindow';

const TestPage = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);

  const { testConfigData } = state as RootState;

  useEffect(() => {
    if (!testConfigData) {
      navigate('/');
    }
  }, [testConfigData]);

  return (
    <>
      <div className="grid grid-cols-2 gap-6 min-h-screen">
        <TestWindow windowNo={1} />
        <TestWindow windowNo={2} />
      </div>
    </>
  );
};

export default TestPage;
