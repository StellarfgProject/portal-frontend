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
      <div className="form-group">
        <label className="form-label">{name}:</label>
        {iseditable ? (
          <input
            type="text"
            className="form-control"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input type="text" className="form-control" value={value} readOnly />
        )}
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
