import React, { useState } from "react";
import "./StatusManagement.css";
import StatusForm from "./StatusForm";
import StatusLogTable from "./StatusLogTable";

const StatusManagement = ({ application, onStatusUpdate }) => {
  const [logs, setLogs] = useState([]);

  const handleUpdate = (newLogEntry) => {
    setLogs([newLogEntry, ...logs]); // Update the logs state
    if (onStatusUpdate) onStatusUpdate(newLogEntry); // Notify the parent component
  };

  return (
    <div className="status-managemen">
      <StatusForm onUpdate={handleUpdate} />
      <StatusLogTable logs={logs} />
    </div>
  );
};

export default StatusManagement;
