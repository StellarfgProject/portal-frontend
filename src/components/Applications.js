import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import Pagination from "./Pagination";
import ApplicationCard from "./ApplicationCard";
import applicationService from "../services/applicationService";
import CSVService from "../services/csvService";
import Application from "../models/Application";
import "./Applications.css"; // Add your custom styles here

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      const data = await applicationService.getApplications();
      const formattedData = data.map((app) => new Application(app));
      setApplications(formattedData);
      setFilteredApplications(formattedData);
    };

    fetchApplications();
  }, []);

  const handleApplyFilters = async (filters) => {
    const data = await applicationService.getApplications(filters);
    const formattedData = data.map((app) => new Application(app));
    setFilteredApplications(formattedData);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    const searchResults = applications.filter((app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredApplications(searchResults);
  };

  const handleExportCSV = () => {
    const headers = [
      "Name",
      "City/State",
      "Phone",
      "Email",
      "Submitted At",
      "Domain",
      "Status",
    ];
    const data = filteredApplications.map((app) => ({
      Name: app.name,
      "City/State": app.cityState,
      Phone: app.phone,
      Email: app.email,
      "Submitted At": app.submittedAt,
      Domain: app.domain,
      Status: app.status,
    }));

    CSVService.generateCSV(headers, data, "applications.csv");
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
          <Filters
            domainsList={["Technology", "Healthcare", "Finance"]}
            onSaveFilters={handleApplyFilters}
          />
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

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-light">
            <tr>
              <th>Action</th>
              <th>Name / City, State</th>
              <th>Phone / Email</th>
              <th>Submitted At (Eastern) / Domain</th>
              <th>Updated By</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentApplications.map((app) => (
              <ApplicationCard key={app.name} application={app} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-center mt-4">
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
