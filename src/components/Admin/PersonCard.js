// PersonCard.js
import React from 'react';
import './PersonCard.css';

const PersonCard = ({ person }) => {
  const handleCardClick = () => {
    window.location.href = `/admin/person/${person.email}`;
  };

  return (
    <div className="card person-card shadow" onClick={handleCardClick}>
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center">
            {person.firstName[0]}
          </div>
          <div className="ml-3">
            <h5 className="mb-0">{`${person.firstName} ${person.lastName}`}</h5>
            <small className="text-muted">{person.email}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
