import React, { useState } from "react";
import PropTypes from "prop-types";
import "./FormField.css";

const FormField = ({ name, value, iseditable = false, type = "text", options = [], onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleSave = () => {
    setIsEditing(false); // Exit edit mode
    if (onChange) onChange(currentValue); // Notify the parent about the updated value
  };

  const handleEdit = () => {
    if (iseditable) {
      setIsEditing(true); // Enter edit mode
    }
  };

  return (
    <div className="row mb-3">
      {/* Label */}
      <label className="col-4 col-form-label fw-bold">{name} :</label>

      {/* Content */}
      <div className="col-8 d-flex align-items-center">
        {isEditing ? (
          // Editable view
          <>
            <input
              type={type}
              className="form-control me-2"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
            />
            <button type="button" className="btn btn-success btn-sm" onClick={handleSave}>
              <i className="bi bi-check-circle-fill"></i>
            </button>
          </>
        ) : (
          // Non-editable view
          <>
            <span className="me-2">{currentValue}</span>
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  iseditable: PropTypes.bool,
  type: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func, // Callback function for handling updates
};

export default FormField;
