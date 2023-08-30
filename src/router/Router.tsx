import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Home, Detail } from '../pages';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'detail/:issueNumber',
        element: <Detail />,
      },
    ],
  },
]);

export default router;
