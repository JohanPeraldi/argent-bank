import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Root from './routes/Root/Root';
import SignIn from './routes/SignIn/SignIn';
import User from './routes/User/User';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <h1>Ooops! There seems to be a problem!</h1>,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'user',
        element: <User />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
