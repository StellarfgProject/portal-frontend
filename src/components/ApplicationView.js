import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import applicationService from "../services/applicationService";
import "./ApplicationView.css"; // Custom CSS for styling

const ApplicationView = ({ isAdmin }) => {
  const { id } = useParams(); // Get the application ID from the URL
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      const data = await applicationService.getApplicationById(id); // Fetch application details
      setApplication(data);
    };

    fetchApplicationDetails();
    setIsEditable(isAdmin); // Allow editing only if the user is an admin
  }, [id, isAdmin]);

  const handleClaimApplication = () => {
    // Logic for claiming the application
    alert("Application claimed!");
  };

  const handleUpdateStatus = () => {
    // Logic for updating status
    alert("Status updated!");
  };

  const handleRaiseTicket = () => {
    // Logic for raising a ticket
    alert("Ticket raised!");
  };

  if (!application) {
    return <div className="text-center mt-5">Loading application details...</div>;
  }

  return (
    <div className="container mt-4 application-view">
      {/* Back Button */}
      <button className="btn btn-secondary mb-4" onClick={() => navigate("/applications")}>
        <i className="bi bi-arrow-left"></i> Back to Applications
      </button>

      {/* Title Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="page-title text-primary">Application Details</h1>
        {application.claimed_by ? (
          <div>
            <button className="btn btn-warning me-2" onClick={handleUpdateStatus}>
              Update Status
            </button>
            <button className="btn btn-danger" onClick={handleRaiseTicket}>
              Raise Ticket
            </button>
          </div>
        ) : (
          <button className="btn btn-success" onClick={handleClaimApplication}>
            Claim This Application
          </button>
        )}
      </div>

      {/* Application Form */}
      <form className="application-form">
        {/* Section 1: Applicant Information */}
        <div className="form-section mb-4">
          <h4 className="section-title">Applicant Information</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                value={application.first_name}
                disabled={!isEditable}
                onChange={(e) =>
                  setApplication({ ...application, first_name: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={application.last_name}
                disabled={!isEditable}
                onChange={(e) =>
                  setApplication({ ...application, last_name: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={application.email}
                disabled={!isEditable}
                onChange={(e) =>
                  setApplication({ ...application, email: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                value={application.phone_1}
                disabled={!isEditable}
                onChange={(e) =>
                  setApplication({ ...application, phone_1: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Section 2: Address Details */}
        <div className="form-section mb-4">
          <h4 className="section-title">Address Details</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                value={application.city}
                disabled={!isEditable}
                onChange={(e) => setApplication({ ...application, city: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                value={application.state}
                disabled={!isEditable}
                onChange={(e) => setApplication({ ...application, state: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Application Details */}
        <div className="form-section mb-4">
          <h4 className="section-title">Application Details</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Submitted At</label>
              <input
                type="text"
                className="form-control"
                value={application.ts}
                disabled
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Domain</label>
              <input
                type="text"
                className="form-control"
                value={application.domain}
                disabled={!isEditable}
                onChange={(e) => setApplication({ ...application, domain: e.target.value })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Claimed By</label>
              <input
                type="text"
                className="form-control"
                value={application.claimed_by || "Unclaimed"}
                disabled
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={application.status}
                disabled={!isEditable}
                onChange={(e) => setApplication({ ...application, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Denied">Denied</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        {isEditable && (
          <div className="text-end">
            <button className="btn btn-primary">Save Changes</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ApplicationView;
