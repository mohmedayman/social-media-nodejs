import React, { useState, useEffect } from 'react';

const Comment = ({ postId, userId}) => {
  const [username, setUsername] = useState('');
  const [comments, setComments] = useState([]);



  useEffect(() => {
    const fetchComments = async () => {
      let commentOwner ;
      try {
        const response = await fetch(`http://localhost:5000/api/comments/${postId}`);
        const data = await response.json();
        setComments(data.data.comments);
        
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
   console.log("t1");
    const fetchUsername = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        const userData = await response.json();
        setUsername(userData.data.user.username);
        console.log("test", userData.data.user.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchComments();
    fetchUsername();

    
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
              <a className="inline-block text-base font-bold mr-2" href="#">{username}</a>
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
