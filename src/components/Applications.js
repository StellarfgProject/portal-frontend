import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Filters from "./Filters";
import Pagination from "./Pagination";
import ApplicationCard from "./ApplicationCard";
import applicationService from "../services/applicationService";
import CSVService from "../services/csvService";
import "./Applications.css";
import Application from "../models/Application";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("");
  const [pageSize] = useState(10);
  const [error, setError] = useState(null); 

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initialize = async () => {
      setError(null); // Reset error state
      try {
        if (location.pathname === "/applications") {
          const data = await applicationService.getDefault();
          
          
          if (!data.valid) throw new Error(error);

          setApplications(data.applications);
          setTotalPages(data.pagination.totalPages);
          navigate(`/applications/${data.view}`, { replace: true });
          setCurrentView(data.view);
        } else {
          const view = location.pathname.split("/").pop();
          await fetchApplications(view, 1);
        }
      } catch (err) {
        setError(err.message || "Failed to load applications.");
      }
    };
    initialize();
  }, [location.pathname]);

  const fetchApplications = async (view, pageIndex) => {
    setError(null); // Reset error state
    try {
      const data = await applicationService.getByView( view, pageSize,  pageIndex - 1);
      
      let applications = data.applications;
      let pagination = data.pagination;
      const valid = data.valid;
      view = data.view;

      const apps =  applications.map((app) => new Application(app));
      if (!valid) throw new Error(error);

      setApplications(apps);
      setTotalPages(pagination.totalPages);
      setCurrentPage(pageIndex);
      setCurrentView(view);
    } catch (err) {
      console.log(err)
      setError(err.message || "Failed to load applications.");
    }
  };

  const handlePageChange = async (page) => {
    await fetchApplications(currentView, page);
  };

  const handleApplyFilters = async (filters) => {
    setError(null); // Reset error state
    try {
      const { applications, pagination, valid, error } = await applicationService.getByView(
        currentView,
        pageSize,
        0,
        filters
      );
      if (!valid) throw new Error(error);

      setApplications(applications);
      setTotalPages(pagination.totalPages);
      setCurrentPage(1);
    } catch (err) {
      setError(err.message || "Failed to apply filters.");
    }
  };

  const handleSearch = () => {
    setError(null); // Reset error state
    const searchResults = applications.filter((app) =>
      `${app.first_name} ${app.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setApplications(searchResults);
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    const headers = [
      "First Name",
      "Last Name",
      "City",
      "State",
      "Email",
      "Submitted At",
      "Domain",
      "Status",
    ];
    const data = applications.map((app) => ({
      "First Name": app.first_name,
      "Last Name": app.last_name,
      City: app.city,
      State: app.state,
      Email: app.email,
      "Submitted At": app.ts_formatted,
      Domain: app.domain,
      Status: app.status,
    }));

    CSVService.generateCSV(headers, data, "applications.csv");
  };

  return (
    <div className="container mt-4">

      {error ? ( 
        <div className="alert alert-danger" role="alert">
          {error} 
        </div>
      ) : (
        <>
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
                domainsList={["autorefi.belco.org", "autorefi.cunj.com", "autorefi.regionalfcu.com", "autorefi.ohiovalleycu.org","checking.lubbocknational.com","autorefi.tremontcu.salrefi.com","autorefi.weststar.salrefi.com"]}
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
                {applications.map((app) => (
                  <ApplicationCard key={app.guid} application={app} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
       )} 
    </div>
  );
};

export default Applications;
