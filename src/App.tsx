import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/Homepage';
import TestPage from './components/TestPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route
            path="*"
            element={
              <div className="container mx-auto h-screen flex flex-col justify-center items-center">
                <h2 className="text-center font-bold text-4xl  text-white ">Route Not Found!</h2>
                <Link to="/" className="p-2 my-4">
                  Go to Home
                </Link>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
