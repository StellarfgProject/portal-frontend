import React, { useState } from "react";
import statusOptions from "../../assets/data/StatusOptions.json";
import applicationService from "../../services/applicationService";
import './StatusForm.css';

const StatusForm = ({ guid, onUpdate }) => {
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");

  const handleUpdate = async () => {
    
    if (!status) {
      alert("Please select a status before updating.");
      return;
    }
  
    try {
      const result = await applicationService.insertStatus(guid, status, note);
  
      if (result.valid) {
        alert("Status updated successfully!");
        setStatus("");
        setNote("");
        if (onUpdate) onUpdate(result);
      } else {
        alert(result.error || "Failed to update the status. Please try again.");
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
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
      <div className="form-group mb-3">
        <label htmlFor="status-select" className="form-label fw-bold">Status:</label>
        <select  id="status-select" className="form-control form-control-lg" value={status} onChange={(e) => setStatus(e.target.value)} required >
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
        <textarea id="status-note" className="form-control form-control-lg" rows="3" value={note} onChange={(e) => setNote(e.target.value)} />
      </div>

      <button className="btn btn-primary btn-lg w-100 mt-4" onClick={handleUpdate} >
        Update Status
      </button>
    </div>
  );
};

export default StatusForm;
