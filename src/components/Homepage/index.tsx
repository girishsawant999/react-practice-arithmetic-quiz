import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTestConfigData, updateTestStateForWindow } from '../../redux/actions';

const HomePage = () => {
  const [testConfig, setTestConfig] = useState({
    questionsCount: 10,
    operandsRange: 10
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTestConfig({
      ...testConfig,
      [name]: value
    });
  };

  const onStartTest = () => {
    if (Object.values(testConfig).some((value) => !value)) return;
    dispatch(
      updateTestStateForWindow({
        windowNo: 1,
        clearWindow: true
      })
    );
    dispatch(
      updateTestStateForWindow({
        windowNo: 2,
        clearWindow: true
      })
    );
    dispatch(setTestConfigData(testConfig));
    navigate('/test');
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-white text-4xl py-6">
        Welcome to the Arithmetic Practice Quiz
      </h1>

      <hr className="bg-white text-center my-5" />

      <div className="desc mt-6">
        <p className="text-white text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, quas. Rem reprehenderit
          similique animi id quas ipsum quisquam obcaecati, tenetur, nihil magni quidem magnam
          pariatur, ab est odio tempora harum.
        </p>

        <hr className="bg-white text-center my-5" />

        <div className="flex flex-col justify-center items-center w-full mt-6">
          <h4 className="text-white text-2xl mb-6 text-center">
            Please select the test configurations
          </h4>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <label className="text-white text-xl font-bold" htmlFor="questionsCount">
              No of Questions
            </label>
            <input
              type="number"
              id="questionsCount"
              className="form-control px-4 p-2 rounded-md focus:outline-none w-64"
              placeholder="Enter no of questions"
              name="questionsCount"
              onChange={handleOnChange}
              value={testConfig.questionsCount}
            />

            <label className="text-white text-xl font-bold" htmlFor="operandsRange">
              Operand Range
            </label>
            <input
              type="number"
              id="operandsRange"
              className="form-control px-4 p-2 rounded-md focus:outline-none w-64"
              placeholder="Enter operand range"
              name="operandsRange"
              onChange={handleOnChange}
              value={testConfig.operandsRange}
            />
          </div>

          <hr className="bg-white text-center my-5 w-full" />

          <button
            onClick={onStartTest}
            className="text-white px-4 py-2 border-white border rounded-md hover:bg-white hover:text-black hover:scale-95 transition-colors"
          >
            Start test
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
