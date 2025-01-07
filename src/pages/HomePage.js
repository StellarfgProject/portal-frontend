import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Home from "../components/Home";
import './HomePage.css';

import { useAuth } from "../contexts/AuthProvider";
import Applications from "../components/AllApplications/Applications";
import ApplicationView from "../components/ApplicationView/ApplicationView";
import Profile from "../components/Profile";
import AdminMain from "../components/Admin/AdminMain";

const HomePage = () => {
  const { auth } = useAuth();
  const isAdmin = auth.role.toLowerCase() === "admin";
  const user = {
    firstName: "Meenakshi",
    lastName: "Desu",
    role: "Admin",
  };

  return (
    <div className="homePage">
      <Navbar isAdmin={isAdmin} />
      <div className="homePageContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admin/*" element={<AdminMain />} />
          <Route path="profile" element={<Profile user={user} />} />
          <Route
            path="/applications/view/:id"
            element={<ApplicationView isAdmin={isAdmin} />}
          />
          <Route path="applications/*" element={<Applications />} />
        </Routes>
      </div>
    </div>
  );
};

export default HomePage;
