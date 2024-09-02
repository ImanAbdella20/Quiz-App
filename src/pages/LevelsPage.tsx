import React from 'react';
import { Link } from 'react-router-dom';

const LevelsPage = () => {
  const levels = [1, 2, 3, 4, 5]; // Define your levels

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-8">Select a Level</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {levels.map((level) => (
          <Link key={level} to={`/quiz/${level}`}>
            <button className="px-6 py-3 bg-white text-green-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
              Level {level}
            </button>
          </Link>
        ))}
      </div>
      <Link to="/">
        <button className="mt-20 px-6 py-3 bg-white text-green-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default LevelsPage;
