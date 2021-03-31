import React, { useState } from 'react';
import axios from 'axios';

export default () => {
  const [title, setTitle] = useState('');

  // Call async
  const onSubmit = async (event) => {
    // Prevent form submission by itself
    event.preventDefault();

    // Submit request
    await axios.post('http://localhost:4000/posts', {
      title,
    });

    setTitle('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor=''>Title</label>
          <input
            value={title}
            /* onchange eventhandler assigned, everytime an event e occurs, bind setTitle with e.target.value */
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            className='form-control'
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};
