import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';

export default () => {
  // Default state is object from microservice
  const [posts, setPosts] = useState({});

  // Request
  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/posts');

    setPosts(res.data);
  };

  // Making the request on load
  useEffect(() => {
    fetchPosts();
  }, []);

  // Gives an array of values for posts object
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className='card'
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className='card-body'>
          <h3>{post.title}</h3>
          <CommentCreate postIdProp={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
      {renderedPosts}
    </div>
  );
};
