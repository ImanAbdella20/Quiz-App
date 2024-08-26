import React from 'react';
import { Link } from 'react-router-dom';

const StartPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Quiz App</h1>
      <Link to="/levels">
        <button className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
          Let's Get Started
        </button>
      </Link>
    </div>
  );
};

export default StartPage;
