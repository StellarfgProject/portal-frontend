import React from "react";
import "./Navbar.css";

const Navbar = ({ isAdmin }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-teal">
      <div className="container">
        
        {/* Logo */}
        <a className="navbar-brand" href="/">
          StellarFG
        </a>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse order-2 order-md-1" id="navbarNavDropdown">
              <ul className="navbar-nav me-auto">
                
                {/* Applications Dropdown */}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#applications" id="applicationsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Applications
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="applicationsDropdown">
                    <li><a className="dropdown-item" href="/applications/unclaimed">Unclaimed Applications</a></li>
                    <li><a className="dropdown-item" href="/applications/incomplete">Incomplete Applications</a></li>
                    <li><a className="dropdown-item" href="/applications/all">All Applications</a></li>
                    <li><a className="dropdown-item" href="/applications/mine">My Applications</a></li>
                  </ul>
                </li>

                {/* Tickets Dropdown */}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#tickets" id="ticketsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Tickets
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="ticketsDropdown">
                    <li><a className="dropdown-item" href="/tickets/view">View</a></li>
                    <li><a className="dropdown-item" href="/tickets/raise">Raise</a></li>
                    <li><a className="dropdown-item" href="/tickets/update">Update</a></li>
                  </ul>
                </li>

                {/* Admin (Conditional) */}
                {isAdmin && (
                  <li className="nav-item">
                    <a className="nav-link" href="/admin">Admin</a>
                  </li>
                )}

                {/* Dashboard */}
                <li className="nav-item">
                  <a className="nav-link" href="/dashboard">Dashboard</a>
                </li>
                
              </ul>
            </div>

            <ul class="navbar-nav flex-row ms-auto order-1 order-md-2">

              {/* Mobile Toggle */}
              <button className="navbar-toggler me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

                {/* Notifications */}
                <li className="nav-item me-3">
                  <a className="nav-link position-relative" href="/notifications">
                    <i className="bi bi-bell-fill icon"></i>
                    <span className="position-absolute top-30 start-100 translate-middle badge rounded-pill bg-danger">
                      9
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </a>
                </li>

                {/* Profile */}
                <li className="nav-item dropdown profile-li">
                  <button className="nav-link dropdown-toggle" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false" >
                    <i className="bi bi-person-circle icon" ></i>
                  </button>
                  <ul className="dropdown-menu profile-ul" aria-labelledby="profileDropdown" >
                    <li><a className="dropdown-item" href="/profile">Profile <i className="bi bi-person-fill"></i></a></li>
                    <li><a className="dropdown-item" href="/logout">Logout <i className="bi bi-box-arrow-right"></i> </a></li>
                  </ul>
                </li>

            </ul>
      </div>
    </nav>
  );
};

export default Navbar;