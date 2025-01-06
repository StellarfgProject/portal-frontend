import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Home from "../components/Home";

import { useAuth } from "../contexts/AuthProvider";
import Applications from "../components/AllApplications/Applications";
import ApplicationView from "../components/ApplicationView/ApplicationView";
import Profile from "../components/Profile";


const HomePage = () => {

    const {auth} = useAuth();
    const isAdmin = auth.role.toLowerCase() === "admin";
    const user = {
        firstName: "Meenakshi",
        lastName: "Desu",
        role: "Admin"
    }
    return (
        <div>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile user = {user}/>} />
                <Route path="/applications/view/:id" element={<ApplicationView isAdmin={isAdmin} />} />

                <Route path="applications/*" element={<Applications />}/>
            </Routes>
            
        </div>
    );

}

export default HomePage;