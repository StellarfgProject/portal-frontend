import React from "react";
import "./StatusLogTable.css";

const StatusLogTable = ({ logs }) => {
  return (
    <div className="status-log">
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
                  <td>{entry.ts_formatted}</td>
                  <td className="text-capitalize">{entry.full_name}</td>
                  <td>{entry.status}</td>
                  <td>{entry.status_note || "None"}</td>
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
