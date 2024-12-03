import React, { useState, useEffect } from 'react';
import Filters from './Filters';
import Pagination from './Pagination';
import ApplicationCard from './ApplicationCard';
import applicationService from '../services/applicationService';
import './Applications.css'; // Custom styles

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      const data = await applicationService.getApplications();
      setApplications(data);
      setFilteredApplications(data);
    };

    fetchApplications();
  }, []);

  const handleApplyFilters = async (filters) => {
    const data = await applicationService.getApplications(filters);
    setFilteredApplications(data);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    const searchResults = applications.filter((app) =>
      app.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.last_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredApplications(searchResults);
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Name', 'City', 'State', 'Phone', 'Email', 'Date', 'Domain', 'Status'],
      ...filteredApplications.map((app) => [
        `${app.first_name} ${app.last_name}`,
        app.city,
        app.state,
        app.phone_1,
        app.email,
        app.ts,
        app.domain,
        app.status,
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'applications.csv';
    link.click();
  };

  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(
    indexOfFirstApplication,
    indexOfLastApplication
  );

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-6">
          <h1 className="page-title text-primary">Applications</h1>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-success" onClick={handleExportCSV}>
            <i className="bi bi-download"></i> Export as CSV
          </button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-8">
          <Filters onApplyFilters={handleApplyFilters} />
        </div>
        <div className="col-md-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              <i className="bi bi-search"></i> Search
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {currentApplications.map((app) => (
          <div className="col-md-6 mb-4" key={app.guid}>
            <ApplicationCard
              application={app}
              onView={(guid) => console.log(`Viewing ${guid}`)}
            />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredApplications.length / applicationsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Applications;
