import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./ApplicationCard.css"; // Add your custom CSS styles

const ApplicationCard = ({ application }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/applications/view/${application.guid}`); // Navigate to the view route with the application's ID
  };

  return (
    <tr>
      <td>
        <button className="btn btn-success btn-sm" onClick={handleViewClick}>
          View
        </button>
      </td>
      <td>
        <strong>{application.name}</strong>
        <br />
        <span className="text-muted">{application.cityState}</span>
      </td>
      <td>
        {application.phone}
        <br />
        <a href={`mailto:${application.email}`} className="text-primary">
          {application.email}
        </a>
      </td>
      <td>
        {application.submittedAt}
        <br />
        <span className="text-muted">{application.domain}</span>
      </td>
      <td className="text-muted">Not Updated</td>
      <td>
        <span className="badge table-badge bg-warning text-dark">Pending</span>
        <button className="btn table-btn btn-danger btn-sm ms-2">Notify</button>
      </td>

    </tr>
  );
};

export default ApplicationCard;
