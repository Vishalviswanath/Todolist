import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Records = () => {
  const [records, setRecords] = useState([]);
  const [editedRecord, setEditedRecord] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:3002/getData')
      .then((res) => setRecords(res.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (id, title, body) => {
    setEditedRecord({ id, title, body });
    setIsEditing(true);
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:3002/editData/${editedRecord.id}`, {
        title: editedRecord.title,
        body: editedRecord.body,
      })
      .then((res) => {
        console.log(res);
        fetchData(); 
        setIsEditing(false);
        setEditedRecord({});
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3002/delete/${id}`)
      .then((res) => {
        console.log(res);
        fetchData(); 
      })
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecord({ ...editedRecord, [name]: value });
  };

  return (
    <div className='card'>
      {records.length > 0 ? (
        records.map((rec) => (
          <div key={rec._id} className='card-body'>
            {isEditing && editedRecord.id === rec._id ? (
              <div>
                <input
                  type='text'
                  name='title'
                  value={editedRecord.title}
                  onChange={handleInputChange}
                />
                <textarea
                  name='body'
                  value={editedRecord.body}
                  onChange={handleInputChange}
                />
                <button onClick={handleSave}>Save</button>
              </div>
            ) : (
              <div>
                <h3 className='card-title'>{rec.title}</h3>
                <p className='card-text'>{rec.body}</p>
                <div>
                  <button
                    onClick={() => handleEdit(rec._id, rec.title, rec.body)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(rec._id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No records found</p>
      )}
    </div>
  );
};

export default Records;
