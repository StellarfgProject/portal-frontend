import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import applicationService from "../services/applicationService";
import "./ApplicationView.css"; // Custom CSS for styling
import FormField from "./FormField";

const ApplicationView = ({ isAdmin = false }) => {
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
                <div className="col-12 col-md-6">
                    <FormField name="First Name" value={application.first_name} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, first_name: newValue })}/>
                </div>
                <div className="col-12 col-md-6">
                    <FormField name="last Name" value={application.last_name} iseditable={isEditable}  onChange={(newValue) => setApplication({ ...application, first_name: newValue })} />
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-md-6">
                    <FormField name="Email" value={application.email} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, email: newValue })}/>
                </div>
                <div className="col-12 col-md-6">
                    <FormField name="Phone" value={application.phone_1} iseditable={isEditable}  onChange={(newValue) => setApplication({ ...application, phone_1: newValue })} />
                </div>
            </div>


        
        </div>

        {/* Section 2: Address Details */}
        <div className="form-section mb-4">
          <h4 className="section-title">Address Details</h4>

          <div className="row">
                <div className="col-12 col-md-6">
                    <FormField name="City" value={application.city} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, city: newValue })}/>
                </div>
                <div className="col-12 col-md-6">
                    <FormField name="State" value={application.state} iseditable={isEditable}  onChange={(newValue) => setApplication({ ...application, state: newValue })} />
                </div>
            </div>
        </div>

        {/* Section 3: Application Details */}
        <div className="form-section mb-4">
          <h4 className="section-title">Application Details</h4>

          

            <div className="row">
                <div className="col-12 col-md-6">
                    <FormField name="Submitted At" value={application.ts} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, ts: newValue })}/>
                </div>
                <div className="col-12 col-md-6">
                    <FormField name="Domain" value={application.domain} iseditable={isEditable}  onChange={(newValue) => setApplication({ ...application, domain: newValue })} />
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-md-6">
                    <FormField name="Claimed By" value={application.claimed_by} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, claimed_by: newValue })}/>
                </div>
                <div className="col-12 col-md-6">
                    <FormField name="Status" value={application.status} iseditable={isEditable}  onChange={(newValue) => setApplication({ ...application, status: newValue })} />
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
