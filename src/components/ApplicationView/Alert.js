const Alert = ({ type, message, onClose }) => {
    if (!message) return null;
  
    const alertClass = type === "success" ? "alert alert-success" : "alert alert-danger";
  
    return (
      <div className={`${alertClass} d-flex justify-content-between align-items-center mt-3`} role="alert">
        <span>{message}</span>
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      </div>
    );
  };
  