// src/routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import StartPage from './pages/StartPage';
import Quiz from './component/Quiz';
import LevelsPage from './pages/LevelsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />,
  },
  {
    path: '/levels',
    element: <LevelsPage />,
  },
  {
    path: '/quiz/:level',
    element: <Quiz />,
  },

]);

export default router;
