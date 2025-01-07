// PersonCardForDomains.js
import React from 'react';
import './PersonCardForDomains.css';

const PersonCardForDomains = ({ person, onDelete }) => {
  return (
    <div className="card person-card shadow-sm">
      <div className="card-body">
        <h5>{`${person.firstName} ${person.lastName}`}</h5>
        <p className="text-muted">{person.email}</p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-danger btn-sm" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonCardForDomains;
