import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Records = () => {
  const [record, setRecord] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3002/getData')
      .then((res) => setRecord(res.data))
      .catch((err) => err);
  }, [record]);
  return (
    <div className='card'>
      <h1>Record List</h1>
      {record.length > 0 &&
        record.map((rec) => (
          <div key={rec._id} className='card-body'>
            <h3 className='card-title'>{rec.title}</h3>
            <p className='card-text'>{rec.body}</p>
          </div>
        ))}
      {record.length === 0 && <p>No records found</p>}
    </div>
  );
};

export default Records;
