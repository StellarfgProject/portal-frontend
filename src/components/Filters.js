import React, { useState } from "react";

const Filters = ({ domainsList = [], onSaveFilters }) => {
  const [filters, setFilters] = useState({
    applicationType: "all applications",
    status: "unclaimed",
    dateRange: { start: "", end: "" },
    domains: [],
  });
  const [previousState, setPreviousState] = useState(filters);
  const [showDropdown, setShowDropdown] = useState(false);


  const handleToggleAllDomains = (selectAll) => {
    setFilters((prev) => ({
      ...prev,
      domains: selectAll ? [...domainsList] : [],
    }));
  };

  const handleSave = () => {
    onSaveFilters(filters);
    setPreviousState(filters);
    setShowDropdown(false);
  };

  const handleCancel = () => {
    setFilters(previousState);
    setShowDropdown(false);
  };

  return (
    
    <div className="dropdown">
      {/* Toggle Button */}
      <button className="btn btn-primary dropdown-toggle" type="button" id="filtersDropdownButton" aria-expanded={showDropdown} onClick={() => setShowDropdown((prev) => !prev)}>
        Filters <i className="bi bi-filter"></i>
      </button>

      {/* Dropdown Content */}
      <div className={`dropdown-menu p-3 shadow ${showDropdown ? "show" : ""}`} aria-labelledby="filtersDropdownButton">
        
        {/* Application Type */}
        <div className="mb-3">
          <label className="form-label fw-bold">Application Type</label>
          <select className="form-select" value={filters.applicationType}
            onChange={(e) =>
              setFilters({ ...filters, applicationType: e.target.value })
            }
          >
            <option value="unclaimed">Unclaimed Applications</option>
            <option value="incomplete">Incomplete Applications</option>
            <option value="mine">My Applications</option>
            <option value="all">All Applications</option>
          </select>
        </div>



        {/* Date Range */}
        <div className="form-group">
          <label className="form-label fw-bold">Date Range</label>
          <div className="d-flex gap-2">
            <div className="mb-3">
              <label className="form-label small mb-0" htmlFor="startdate-filter">Start</label>
              <input type="date" className="form-control" id="startdate-filter" value={filters.dateRange.start}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    dateRange: { ...filters.dateRange, start: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group ">
              <label className="form-label small mb-0" htmlFor="enddate-filter">End</label>
              <input type="date" className="form-control" id="enddate-filter" value={filters.dateRange.end}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    dateRange: { ...filters.dateRange, end: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Domains */}
        <div className="mb-3">
        <label className="form-label fw-bold">Domains</label>
        <div className="form-check mb-1 d-flex align-items-center">
          <input className="form-check-input" type="checkbox" id="selectAllDomains" checked={domainsList.length > 0 && filters.domains.length === domainsList.length} onChange={(e) => handleToggleAllDomains(e.target.checked)} />
          <label className="form-check-label ms-2" htmlFor="selectAllDomains"> Select All </label>
        </div>
        {domainsList.map((domain, idx) => (
          <div key={idx} className="form-check mb-1 d-flex align-items-center">
            <input className="form-check-input" type="checkbox" id={`domain-${idx}`} checked={filters.domains.includes(domain)}
              onChange={(e) => {
                const updatedDomains = e.target.checked
                  ? [...filters.domains, domain]
                  : filters.domains.filter((d) => d !== domain);
                setFilters({ ...filters, domains: updatedDomains });
              }}
            />
            <label className="form-check-label ms-2" htmlFor={`domain-${idx}`}>{domain}</label>
          </div>
        ))}
        </div>
   
        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;






