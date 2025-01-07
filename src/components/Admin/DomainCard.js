// DomainCard.js
import React from 'react';
import './DomainCard.css';

const DomainCard = ({ domain }) => {
  return (
    <div className="card domain-card shadow-sm">
      <div className="card-body text-center">
        <h5 className="card-title">{domain.name}</h5>
        <p className="text-muted">{domain.domain}</p>
      </div>
    </div>
  );
};

export default DomainCard;
