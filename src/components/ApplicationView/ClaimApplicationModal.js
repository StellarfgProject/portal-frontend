import React, { useState } from "react";
import "./ClaimApplicationModal.css";
import applicationService from "../../services/applicationService";

const ClaimApplicationModal = ({ guid, onClaimSuccess }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setError("");
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClaim = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await applicationService.claimApplication(guid);
  
      if (result.valid) {
        
        setLoading(false);
        setShow(false);
        if (onClaimSuccess) onClaimSuccess(); 
      } else {
        
        setLoading(false);
        setError(result.error || "Failed to claim the application. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };
  

  return (
    <>
      {/* Claim Button */}
      <button className="btn btn-success claim-btn" onClick={handleShow} >
        Claim This Application
      </button>

      {/* Modal */}
      {show && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-success">Confirm Claim</h5>
                <button type="button" className="close" aria-label="Close" onClick={handleClose} >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="text-muted">
                  Are you sure you want to claim this application? Once claimed,
                  it will be assigned to you.
                </p>
                {error && <div className="alert alert-danger">{error}</div>}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleClaim}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClaimApplicationModal;
