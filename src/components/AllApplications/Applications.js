import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Filters from "./Filters";
import Pagination from "./Pagination";
import ApplicationCard from "./ApplicationCard";
import applicationService from "../../services/applicationService";
import CSVService from "../../services/csvService";
import "./Applications.css";
import Application from "../../models/Application";
import Domains from '../../assets/data/domains.json';
import applicationFields from "../../assets/data/applicationFields";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [domains, setDomains] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    applicationType: "all",
    status: "",
    dateRange: { start: "", end: "" },
    domains: domains,
  });
  const [currentView, setCurrentView] = useState("");
  const [pageSize] = useState(10);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initialize = async () => {
      setError(null); 
      try {
        if (location.pathname === "/applications") {
          
          const data = await applicationService.getDefault();
          if (!data.valid) throw new Error(data.error);

          navigate(`/applications/${data.view}`, { replace: true });

        } else {
          const view = location.pathname.split("/").pop();
          await fetchApplications(view, 1);
        }

        const domainsData = await applicationService.getDomains();
        if (!domainsData.valid) throw new Error(domainsData.error);

        setDomains(domainsData.data.domains);

      } catch (err) {
        setError(err.message || "Failed to load applications.");
      }
    };
    initialize();
  }, [location.pathname]);

  const fetchApplications = async (view, pageIndex, searchTerm = searchQuery, appliedFilters = filters) => {
    setError(null);
    setLoading(true);
    try {
      
      const { applications, pagination, valid, error } = await applicationService.getByView( view, pageSize,  pageIndex - 1, searchTerm, appliedFilters);
      const apps =  applications.map((app) => new Application(app));

      if (!valid) throw new Error(error);

      setApplications(apps);
      setTotalPages(pagination.totalPages);
      setCurrentPage(pageIndex);
      setCurrentView(view);
    } catch (err) {
      console.log(err)
      setError(err.message || "Failed to load applications.");
    } finally {
      setLoading(false)
    }
  };

  const handlePageChange = async (page) => {
    await fetchApplications(currentView, page);
  };

  const handleSearch = async () => {
    await fetchApplications(currentView, 1);
  };

  const handleApplyFilters = async (newFilters) => {
    setFilters(newFilters); // Update filters state
    await fetchApplications(currentView, 1, searchQuery, newFilters);
  };
   
  const handleExportCSV = async () => {
    try {
      const { applications, valid, error } = await applicationService.getByView(
        currentView,
        1000, 
        0
      );
  
      if (!valid) {
        setError(error);
        return;
      }
  
      // const headers = [
      //   "First Name",
      //   "Last Name",
      //   "City",
      //   "State",
      //   "Email",
      //   "Submitted At",
      //   "Domain",
      //   "Status",
      //   "ZIP"
      // ];
  
      // const data = applications.map((app) => ({
      //   "First Name": app.first_name,
      //   "Last Name": app.last_name,
      //   City: app.city,
      //   State: app.state,
      //   Email: app.email,
      //   "Submitted At": app.ts_formatted,
      //   Domain: app.domain,
      //   Status: app.status,
      //   ZIP: app.zip
      // }));
  
      const headers = applicationFields.map((field) => field.label);
      const data = applications.map((app) =>
        applicationFields.reduce((row, field) => {
          row[field.label] = app[field.key] || 'null'; 
          return row;
        }, {})
      );

      CSVService.generateCSV(headers, data, `${currentView}_applications.csv`);
    } catch (error) {
      console.error(error);
      setError('Failed to export applications.');
    }
  };
  
  return (
    <div className="applications-container mt-4">
      {loading && <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>}
      {error ? ( 
        <div className="alert alert-danger" role="alert">
          {error} 
        </div>
      ) : (
        <>
          <div className="row mb-4">
            <div className="col-md-6">
              <h1 className="page-title">Applications</h1>
            </div>
            <div className="col-md-6 text-end">
              <button className="btn btn-success" onClick={handleExportCSV}>
                <i className="bi bi-download"></i> Export as CSV
              </button>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-8">
              <Filters domainsList={domains} onSaveFilters={handleApplyFilters} />
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search applications..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
                  <th></th>
                  <th>Name /<br /> City, State</th>
                  <th>Phone /<br /> Email</th>
                  <th>Submitted At (EST) /<br /> Domain</th>
                  <th>Updated By</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <ApplicationCard key={app.guid} application={app} view= {currentView}/>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </>
       )} 
    </div>
  );
};

export default Applications;
