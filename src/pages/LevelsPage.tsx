// src/pages/LevelsPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const LevelsPage = () => {
  const levels = [1, 2, 3, 4, 5]; // Define your levels

  return (
    <div className="levels-page">
      <h1>Select a Level</h1>
      {levels.map((level) => (
        <Link key={level} to={`/quiz/${level}`}>
          <button>Level {level}</button>
        </Link>
      ))}
    </div>
  );
};

export default LevelsPage;
