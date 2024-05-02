import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from './pages/home/home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Post from  './Components/Post/post'
import Sidebar from './Components/Sidebar/Sidebar';

import Logout from './Components/Logout/Logout';

const router = createBrowserRouter([
  {

    path: '/',
    element: <HomePage />
  },

  {
    path: '/register',
    element: <Register />
  },

  {
    path: '/login',
    element: <Login />

  },
  {
    path: '/logout',
    element: <Logout />

  },
  {
    path: '/logout',
    element: <Logout />

  },

  {
    path: '/posts',
    element: <Post />

  },

  {
    path: 'sidebar',
    element: <Sidebar />
  }

  {
    path: '/posts',
    element: <Post />

  },

  {
    path: 'sidebar',
    element: <Sidebar />
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
