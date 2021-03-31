import React, { useState } from 'react';
import axios from 'axios';

export default ({ postIdProp }) => {
  const [content, setContent] = useState('');

  // Call async
  const onSubmit = async (event) => {
    // Prevent form submission by itself
    event.preventDefault();

    // Submit request
    await axios.post(`http://localhost:4001/posts/${postIdProp}/comments`, {
      content,
    });

    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor=''>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='form-control'
            type='text'
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};
