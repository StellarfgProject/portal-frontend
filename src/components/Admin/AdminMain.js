import React, { useState, useEffect } from "react";
import { NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import People from "./People";
import AllDomains from "./AllDomains";
import Domain from "./Domain";
import adminService from "../../services/adminService";
import "./AdminMain.css";
import Person from "./Person";

const AdminMain = () => {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  useEffect(() => {
    
    const fetchDomains = async () => {
      const data = await adminService.getAllDomains();
      setDomains(data);
      setLoading(false);
    };
    fetchDomains();
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="admin-main">
 
      <div className="sidebar">
        <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } end >
          <i className="bi bi-house-door"></i> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin/people" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } >
          <i className="bi bi-people"></i> <span>People</span>
        </NavLink>

        {/* Domains - Small Screens */}
        <div className="d-md-none">
          <NavLink to="/admin/domains" className={({ isActive }) => isActive ? "nav-link active" : "nav-link" }  >
            <i className="bi bi-diagram-3"></i> <span>Domains</span>
          </NavLink>
        </div>

        {/* Domains - Medium and Larger Screens */}
        <div className="d-none d-md-block">
          {/* Domains Toggle */}
          <div className="nav-item" data-bs-toggle="collapse" data-bs-target="#adminCollapse" aria-controls="adminCollapse" aria-expanded={!isCollapsed} onClick={toggleCollapse} >
            <NavLink to="/admin/domains"  className={({ isActive }) => isActive ? "nav-link active" : "nav-link" } >
              <span className="d-flex align-items-center justify-content-between w-100">
                <span>
                  <i className="bi bi-diagram-3 me-2"></i> Domains
                </span>
                <i className={`bi ${ isCollapsed ? "bi-chevron-down" : "bi-chevron-up" } collapse-arrow`} ></i>
              </span>
            </NavLink>
          </div>

          {/* Subdomain Links */}
          <div className="collapse" id="adminCollapse">
          {loading ? (
            <div className="loading">Loading domains...</div>
          ) : domains.length > 0 ? (
            domains.map((domain) => (
              <NavLink key={domain.id} to={`/admin/domain/${domain.name}`}  
              className={({ isActive }) =>
                isActive ? "sub-nav-link active" : "nav-link sub-nav-link"
              }
              >
                <i className="bi bi-folder"></i> <span>{domain.name}</span>
              </NavLink>
              ))
            ) : (
              <div className="no-domains">No domains available</div>
            )}
        </div>

        </div>

      </div>

      {/* Content Section */}
      <div className="content">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/people" element={<People />} />
          <Route path="/domains" element={<AllDomains />} />
          {/* <Route path="/domain" element={<Domain />} /> */}
          <Route path="/domain/:name" element={<Domain />} />
          <Route path="person/:email" element={<Person />} />

        </Routes>
      </div>
    </div>
  );
};

export default AdminMain;
