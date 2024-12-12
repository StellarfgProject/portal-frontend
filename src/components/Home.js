import React from "react";
import "./Home.css"; // Custom styling
import { useAuth } from "../contexts/AuthProvider";

const Home = () => {

  const {auth} = useAuth();
  const username = auth.userDetails.first_name + " " + auth.userDetails.last_name; 

  return (
    <div className="container mt-4">
      {/* Welcome Message */}
      <h1 className="text-primary">Welcome, {username} !</h1>

      {/* Applications Section */}
      <section className="mt-4">
        <h2 className="section-title">Applications</h2>
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-3 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">Unclaimed Applications</h5>
                <p className="card-text text-muted">View applications that haven't been claimed yet.</p>
                <a href="/applications/unclaimed" className="btn btn-primary mt-auto">
                  Go to Unclaimed
                </a>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="col-md-3 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">Incomplete Applications</h5>
                <p className="card-text text-muted">Review applications that are incomplete.</p>
                <a href="/applications/incomplete" className="btn btn-primary mt-auto">
                  Go to Incomplete
                </a>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="col-md-3 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">All Applications</h5>
                <p className="card-text text-muted">Access a complete list of all applications.</p>
                <a href="/applications/all" className="btn btn-primary mt-auto">
                  View All
                </a>
              </div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="col-md-3 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">My Applications</h5>
                <p className="card-text text-muted">View applications assigned to you.</p>
                <a href="/applications/mine" className="btn btn-primary mt-auto">
                  Go to Mine
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section className="mt-5">
        <h2 className="section-title">Tickets</h2>
        <div className="alert alert-info">
          Manage tickets related to your applications and updates.
        </div>
      </section>

      {/* Updates Section */}
      <section className="mt-5">
        <h2 className="section-title">Updates</h2>
        <div className="alert alert-secondary">
          Stay up-to-date with the latest application-related updates and announcements.
        </div>
      </section>
    </div>
  );
};

export default Home;
