import React from 'react';
import './Pagination.css'; // Add custom styling

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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

  return (
    <div className="pagination">
      <button
        className="page-button"
        disabled={currentPage === 1}
        onClick={handlePrevious}
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`page-number ${currentPage === number ? 'active' : ''}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        className="page-button"
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
