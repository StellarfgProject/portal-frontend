import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./ApplicationCard.css"; // Add your custom CSS styles

const ApplicationCard = ({ application }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/applications/view/${application.guid}`); // Navigate to the view route with the application's ID
  };

  return (
    <tr className="application-card application-row">
      <td>
        <button className="btn btn-success btn-sm" onClick={handleViewClick}>
          View 
        </button>
      </td>
      <td>
        <strong className="text-uppercase text-dark fw-bolder">{application.name}</strong>
        <br />
        <span className="text-muted">{application.cityState}</span>
      </td>
      <td>
        <span className="">{application.phone}</span>
        <br />
        <a href={`mailto:${application.email}`} className="text-primary text-lowercase">
          {application.email}
        </a>
      </td>
      <td>
        <span className="text-secondary">{application.submittedAt}</span>
        <br />
        <span className="text-muted fst-italic">{application.domain}</span>
      </td>
      <td className={application.claimed_by_full_name ? "text-capitalize" : "text-muted"}>
        {application.claimed_by_full_name ? application.claimed_by_full_name : "Not Updated"}
        <br />
        <span className="text-muted text-lowercase">{application.claimed_by_full_name ? application.claimed_by : ""}</span>
        

      </td>


        {application.status ? (
          <td>
            <span>{application.status}</span>
            <br />
            <span className="text-muted">{application.status_updated_at_formatted}</span>
          </td>
        ) : application.claimed_by ? (
          <td>
            <button className="btn table-btn btn-warning btn-sm">Update Status</button>
          </td>
        ) : (
          <td>
            <span className="badge table-badge bg-warning text-dark">Pending</span>
            <button className="btn table-button btn-outline-secondary btn-sm ms-2">Notify</button>
          </td>
        )}

        
 

    </tr>
  );
};

export default ApplicationCard;
