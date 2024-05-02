import React, { useState, useEffect } from 'react';

const Comment = ({ postId}) => {
  const [username, setUsername] = useState([]);
  const [comments, setComments] = useState([]);



  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/comments/${postId}`, {
          method: 'get',
          headers: {
            'Content-Type' : 'application/json',
            'authorization': "Bearer " + localStorage.getItem('Token'),
          },
        });
        const data = await response.json();
        setComments(data.data.comments);
        const userIds = data.data.comments.map(comment => comment.user);
        return userIds;
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    const fetchUsername = async (userIds) => {
      try {
        const promises = userIds.map(userId =>
          fetch(`http://localhost:5000/api/users/${userId}`).then(response => response.json())
        );
        const userData = await Promise.all(promises);
        
        const userNames = userData.map(user => user.data.user.username);
        setUsername(userNames);        // setUsername(userData);
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };
  
    const fetchData = async () => {
      const userIds = await fetchComments();
      if (userIds) {
        await fetchUsername(userIds);
      }
    };
  
    fetchData();
  }, [postId]);
  

  const formatDateTime = (dateTimeString) => {
    const options = {
     
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',

   
    };

    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  return (
    <div className="pt-6">
      {/* Map over comments array and render a Comment component for each comment */}
      {comments.map((comment, index) => (
        <div key={index} className="media flex pb-4">
          <a className="mr-4" href="#">
            <img className="rounded-full max-w-none w-12 h-12" src="https://randomuser.me/api/portraits/men/82.jpg" alt="User" />
          </a>
          <div className="media-body">
            <div>
              <a className="inline-block text-base font-bold mr-2" href="#">{username[index]}</a>
              <span className="text-slate-500 dark:text-slate-300"> {formatDateTime(comment.createdAt)}</span>
            </div>
            <p>{comment.content}.</p>
           
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default Comment;
