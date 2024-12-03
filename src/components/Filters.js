import React, { useState } from 'react';

const Filters = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    domain: '',
    state: '',
    status: '',
    dateRange: ['', '']
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleDateChange = (index, value) => {
    const newDateRange = [...filters.dateRange];
    newDateRange[index] = value;
    setFilters({ ...filters, dateRange: newDateRange });
  };

  const applyFilters = () => onApplyFilters(filters);

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Domain"
        name="domain"
        value={filters.domain}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="State"
        name="state"
        value={filters.state}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Status"
        name="status"
        value={filters.status}
        onChange={handleInputChange}
      />
      <input
        type="date"
        placeholder="Start Date"
        value={filters.dateRange[0]}
        onChange={(e) => handleDateChange(0, e.target.value)}
      />
      <input
        type="date"
        placeholder="End Date"
        value={filters.dateRange[1]}
        onChange={(e) => handleDateChange(1, e.target.value)}
      />
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filters;
