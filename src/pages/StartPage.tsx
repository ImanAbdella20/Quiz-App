// src/pages/StartPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const StartPage = () => {
  return (
    <div className="start-page">
      <h1>Welcome to the Quiz App</h1>
      <Link to="/levels">
        <button>Let's Get Started</button>
      </Link>
    </div>
  );
};

export default StartPage;
