import React, { useState } from "react";
import PropTypes from "prop-types";
import "./FormField.css";

const formatValue = (value, type) => {
  if (type === "date") {
    const date = new Date(value);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  }
  return value;
};

const FormField = ({
  name,
  value,
  iseditable = false,
  type = "text",
  options = {},
  onChange,
}) => {
  // Helper function to format the date
   

  // Move formatValue into the initialization logic
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(() => formatValue(value, type)); // Lazy initialization ensures formatValue is defined

  const handleSave = () => {
    setIsEditing(false);
    if (onChange) onChange(currentValue);
  };

  const handleEdit = () => {
    if (iseditable) {
      setIsEditing(true);
    }
  };

  const renderSelectOptions = () => {
    const isGrouped = Object.values(options).some(
      (value) => typeof value === "object" && !Array.isArray(value)
    );

    if (isGrouped) {
      return Object.entries(options).map(([groupLabel, groupOptions]) => (
        <optgroup key={groupLabel} label={groupLabel}>
          {Object.entries(groupOptions).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </optgroup>
      ));
    }

    return Object.entries(options).map(([key, label]) => (
      <option key={key} value={key}>
        {label}
      </option>
    ));
  };

  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    setCurrentValue(inputDate);
  };

  return (
    <div className="row mb-3 form-group">
      <label className="form-label fw-bold">{name} :</label>
      <div className="d-flex align-items-center">
        {isEditing ? (
          <>
            {type === "select" ? (
              <select
                className="form-control form-control-lg me-2"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
              >
                {renderSelectOptions()}
              </select>
            ) : type === "date" ? (
              <input
                type="date"
                className="form-control form-control-lg me-2"
                value={currentValue}
                onChange={handleDateChange}
              />
            ) : (
              <input
                type={type}
                className="form-control form-control-lg me-2"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
              />
            )}
            <button type="button" className="btn btn-success btn-sm" onClick={handleSave}>
              <i className="bi bi-check-circle-fill"></i>
            </button>
          </>
        ) : (
          <>
            <div className="me-2 form-control form-control-lg">
              {type === "select" ? options[currentValue] || currentValue : currentValue}
            </div>
            {iseditable && (
              <button type="button" className="btn btn-transparent btn-sm" onClick={handleEdit}>
                <i className="bi bi-pencil-fill"></i>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  iseditable: PropTypes.bool,
  type: PropTypes.oneOf(["text", "select", "date"]),
  options: PropTypes.object, 
  onChange: PropTypes.func,
};

export default FormField;
