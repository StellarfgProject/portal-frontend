// AddPerson.js
import React from 'react';
import './AddPerson.css';

const AddPerson = ({ onAddPerson }) => {
  const handleAddPerson = () => {
    const newPerson = {
      id: Date.now(),
      firstName: 'New',
      lastName: 'Person',
      email: 'new.person@example.com',
    };
    onAddPerson(newPerson);
  };

  return (
    <div className="add-person mt-4">
      <button className="btn btn-primary" onClick={handleAddPerson}>
        Add Person
      </button>
    </div>
  );
};

export default AddPerson;
