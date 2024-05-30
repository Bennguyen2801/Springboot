import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/post/list');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
      setError(null); // Reset error state if successful
    } catch (error) {
      console.error(error);
      setError('Failed to fetch posts'); // Set error message
      setPosts([]); // Ensure posts is initialized as an empty array in case of error
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.content}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
