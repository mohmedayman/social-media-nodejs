import React from 'react';

const PostLikes = ( {likes, postId, toggleLike} ) => {

  const  handleSubmit = async (e) => {
    e.preventDefault();
    const Token = localStorage.getItem('Token');
    if (!Token) {
        alert('Please login first');
        return;
    }
    console.log("Token", Token)
    let result = await fetch(`http://localhost:5000/api/posts/like/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Token,
        },
    });

    result = await result.json();

    if (result.message === "Like Toggled") { 
      toggleLike(postId)
    } else {
        alert('Failed to add like');
    }
  };

  return (
    
    <div class="py-4">
      <form onSubmit={handleSubmit}>
        <button type="submit" className="inline-flex items-center" href="#">
          <span class="mr-2">
            <svg className="w-8 fill-rose-600 dark:fill-rose-400"  viewBox="0 0 24 24">
              <path
                d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
              </path>
            </svg>
          </span>
          <span class="text-lg font-bold">{likes} </span>
        </button>
      </form>
  </div>
    
  );
};

export default PostLikes;
