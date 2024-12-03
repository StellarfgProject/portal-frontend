import React from 'react';
import './ApplicationCard.css'; // Optional custom styles

const ApplicationCard = ({ application, onView }) => (
  <div className="card shadow-sm">
    <div className="card-body">
      <h5 className="card-title text-primary">
        {application.first_name} {application.last_name}
      </h5>
      <p className="card-text">
        <strong>Location:</strong> {application.city}, {application.state}
      </p>
      <p className="card-text">
        <strong>Email:</strong> <a href={`mailto:${application.email}`}>{application.email}</a>
      </p>
      <p className="card-text">
        <strong>Domain:</strong> {application.domain}
      </p>
      <p className="card-text">
        <strong>Status:</strong> <span className="badge bg-info">{application.status}</span>
      </p>
      <button className="btn btn-outline-primary" onClick={() => onView(application.guid)}>
        View Details
      </button>
    </div>
  </div>
);

export default ApplicationCard;
