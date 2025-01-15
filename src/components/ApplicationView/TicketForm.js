import React, { useState } from "react";
import "./TicketForm.css";

const TicketForm = ({ guid, onSubmit, onClose }) => {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!note.trim()) {
      alert("Please enter a note.");
      return;
    }

    const ticketData = {
      note,
      timestamp: new Date().toISOString(),
      updated_by: "Current User", 
      replied_by: "", 
    };

    setLoading(true);
    try {
      await onSubmit(ticketData);
      setNote("");
      onClose();
    } catch (err) {
      alert("An error occurred while submitting the ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ticket-form-container">
      <div className="form-group mb-3">
        <label htmlFor="ticket-note" className="form-label">
          Notes:
        </label>
        <textarea
          id="ticket-note"
          className="form-control"
          rows="4"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter your request like if you are missing any information or need any help regarding applicant details."
        />
      </div>
      <button
        className="btn btn-warning btn-lg w-100"
        onClick={handleSubmit}
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
          "Submit Request"
        )}
      </button>
    </div>
  );
};

export default TicketForm;
