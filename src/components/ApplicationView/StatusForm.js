import React, { useState } from "react";
import statusOptions from "../../assets/data/StatusOptions.json";
import applicationService from "../../services/applicationService";
import "./StatusForm.css";

const StatusForm = ({ guid, onUpdate }) => {
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!status) {
      window.alert("⚠️ Please select a status before updating.");
      return;
    }
    setShowModal(true);
  };
  
  const confirmUpdate = async () => {
    setLoading(true);
    try {
      const result = await applicationService.insertStatus(guid, status, note);
  
      if (result.valid) {
        window.alert("✅ Status updated successfully!");
        setStatus("");
        setNote("");
        if (onUpdate) onUpdate(result);
      } else {
        window.alert(`❌ ${result.error || "Failed to update the status. Please try again."}`);
      }
    } catch (error) {
      window.alert("❌ An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };
  

  const renderStatusOptions = () => {
    return Object.entries(statusOptions).map(([groupLabel, groupOptions]) => (
      <optgroup key={groupLabel} label={groupLabel}>
        {Object.entries(groupOptions).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </optgroup>
    ));
  };

  return (
    <div className="status-form">
      {/* Status Form */}
      <div className="form-group mb-3">
        <label htmlFor="status-select" className="form-label fw-bold">
          Status:
        </label>
        <select
          id="status-select"
          className="form-control form-control-lg"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="" disabled>
            &mdash; Select one &mdash;
          </option>
          {renderStatusOptions()}
        </select>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="status-note" className="form-label fw-bold">
          Notes:
        </label>
        <textarea
          id="status-note"
          className="form-control form-control-lg"
          rows="3"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary btn-lg w-100 mt-4"
        onClick={handleUpdate}
      >
        Update Status
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-primary ">
                <h5 className="modal-title text-white">
                  <i className="bi bi-question-circle-fill text-white me-2"></i> Confirm Status Update
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <p className="fs-5 text-muted">
                  Are you sure you want to update the status? This action cannot be undone.
                </p>
                <div className="alert alert-warning d-flex align-items-center justify-content-center">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <strong>Current Status:</strong> {status}
                </div>
                <p className="text-secondary">
                  <strong>Note:</strong> {note || "No additional notes provided."}
                </p>
              </div>
              <div className="modal-footer">
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-md-6 mb-2 mb-md-0 d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-lg w-100"
                        onClick={() => setShowModal(false)}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-success btn-lg w-100"
                        onClick={confirmUpdate}
                        disabled={loading}
                      >
                        {loading ? (
                          <div
                            className="spinner-border spinner-border-sm text-light"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          "Confirm"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusForm;
