import React, { useState, useEffect } from 'react';

const PostCreator = ({ userId , postTime}) => {
  
  const [username, setUsername] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    
    const fetchUsername = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        const userData = await response.json();
        setUsername(userData.data.user.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();

    // Format the date and time when postTime changes
    if (postTime) {
      const parsedDate = new Date(postTime);
      const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
      const optionsTime = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
      setFormattedDate(parsedDate.toLocaleDateString(undefined, optionsDate));
      setFormattedTime(parsedDate.toLocaleTimeString(undefined, optionsTime));
    }
  }, [userId, postTime]);


  return (
    <div className="flex pb-6 items-center justify-between">
      <div className="flex">
        <a className="inline-block mr-4" href="#">
          <img className="rounded-full max-w-none w-12 h-12" src="https://randomuser.me/api/portraits/men/35.jpg" alt="Profile" />
        </a>
        <div className="flex flex-col">
          <div>
            <a className="inline-block text-lg font-bold dark:text-white" href="#">{username}</a>
          </div>
          <div className="text-slate-500 dark:text-slate-300 dark:text-slate-400">
           {formattedDate}
           {' '}
           {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCreator;
