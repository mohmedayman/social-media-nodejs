import React, { useState } from 'react';

const NewPostForm = ({ addPost }) => {
  const [content, setContent] = useState('');

  const  handleSubmit = async (e) => {
    e.preventDefault();
    const Token = localStorage.getItem('Token');
    if (!Token) {
        alert('Please login first');
        return;
    }
    console.log("content", content)
    console.log("Token", Token)
    // Check if content is not empty
    if (content.trim() !== '') {
        let result = await fetch('http://localhost:5000/api/posts/', {
            method: 'post',
            body: JSON.stringify({ content }),
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Bearer " + Token,
            },
            });

        result = await result.json();
            console.log("result", result)

        if (!result.message.includes('error')) { 
            // Clear the input field after submitting
            setContent('');
            addPost(result.post);  
        } else {
            alert('Failed to add post');
        }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
        <h2 className='text-2xl font-bold mb-2 text-center text-blue-500 dark:text-blue-300 md:text-3xl '>Add New Post</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows="4"
        className="w-full border rounded-md p-2 text-black"
      ></textarea>
      <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
        Add Post
      </button>
    </form>
  );
};

export default NewPostForm;
