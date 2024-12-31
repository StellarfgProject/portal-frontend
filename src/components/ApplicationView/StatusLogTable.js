import React from "react";
import "./StatusManagement.css";

const StatusLogTable = ({ logs }) => {
  return (
    <div className="status-log">
      <h3 className="mt-5 mb-3">Status Log</h3>
      <div className="log-container">
        {logs.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Updated By</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.timestamp}</td>
                  <td>{entry.updatedBy}</td>
                  <td>{entry.status}</td>
                  <td>{entry.note || "None"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted">No status updates available.</p>
        )}
      </div>
    </div>
  );
};

export default StatusLogTable;
