import React, { useEffect } from 'react';
import Sidebar from './../../Components/Sidebar/Sidebar';
import Post from './../../Components/Post/post';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate(); // Hook to perform navigation

  useEffect(() => {
    const user = localStorage.getItem('User');
    const token = localStorage.getItem('Token');
    if (!user || !token) {
      navigate('/login'); // Redirect to login if either user or token is missing
    }
  }, [navigate]);

  return (
    <div>
      <Sidebar />
      <Post />
    </div>
  );
}

export default HomePage;
