import React, { useState } from 'react';
import  "../style.css"

function CreatePost() {
  const [postContent, setPostContent] = useState('');

  const handlePostSubmit = () => {
    // Handle post submission and update feed
  };

  return (
    <div>
      <h1>Create Post</h1>
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button onClick={handlePostSubmit}>Post</button>
    </div>
  );
}

export default CreatePost;
