import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LevelsPage: React.FC = () => {
  const levels: number[] = [1, 2, 3, 4, 5]; // Define your levels
  const [completedLevels, setCompletedLevels] = useState<number>(0);

  useEffect(() => {
    // Retrieve the completed levels from local storage or set to 0 if not found
    const savedProgress = localStorage.getItem('completedLevels');
    setCompletedLevels(savedProgress ? parseInt(savedProgress, 10) : 0);
  }, []);

  const handleLevelCompletion = (level: number) => {
    // Update the completed levels in local storage
    if (level > completedLevels) {
      localStorage.setItem('completedLevels', level.toString());
      setCompletedLevels(level);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-8">Select a Level</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {levels.map((level: number) => (
          <Link
            key={level}
            to={`/quiz/${level}`}
            onClick={() => handleLevelCompletion(level)}
          >
            <button
              className={`px-6 py-3 font-semibold rounded-lg shadow-md transition duration-300 ${
                level <= completedLevels + 1
                  ? 'bg-white text-green-500 hover:bg-gray-100'
                  : 'bg-gray-400 text-gray-700 cursor-not-allowed'
              }`}
              disabled={level > completedLevels + 1}
            >
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
