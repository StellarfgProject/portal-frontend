import React from 'react';
import './Pagination.css'; 

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleFirst = () => {
    onPageChange(1);
  };

  const handleLast = () => {
    onPageChange(totalPages);
  };

  return (
    <div className="pagination">
      <button className="page-button" disabled={currentPage === 1} onClick={handleFirst}>First</button>
      <button className="page-button" disabled={currentPage === 1} onClick={handlePrevious}>Previous</button>
      <span className="page-info">
       &nbsp; Page {currentPage} of {totalPages} &nbsp;
      </span>
      <button className="page-button" disabled={currentPage === totalPages} onClick={handleNext}>Next</button>
      <button className="page-button" disabled={currentPage === totalPages} onClick={handleLast}>Last</button>
    </div>
  );
};

export default Pagination;
