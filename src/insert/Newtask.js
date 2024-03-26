import React, { useState } from 'react';
import axios from 'axios';

const Newtask = () => {
  const [title, setTitle] = useState([]);
  const [body, setBody] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Record has been created');
    axios
      .post('http://localhost:3002/addData', { title: title, body: body })
      .then((res) => {
        setTitle('');
        setBody('');
      })
      .catch((err) => console.log(err));
  };
  return (
    <form className='form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Title'
        value={title}
        name='title'
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />
      <textarea
        type='text'
        placeholder='body.....'
        value={body}
        name='body'
        onChange={(e) => setBody(e.target.value)}
      />
      <br />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Newtask;
