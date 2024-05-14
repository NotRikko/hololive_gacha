import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Main from './pages/Main.jsx';
import Gacha from './pages/Gacha.jsx';
import TeamPage from './pages/TeamPage.jsx';
import './index.css';
import { UserProvider } from './UserProvider.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/main',
    element: <Main />
  },
  {
    path: '/gacha',
    element: <Gacha />
  },
  {
    path:'/team',
    element: <TeamPage />
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
