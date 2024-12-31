import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Home from "../components/Home";
import Applications from "../components/Applications";
import ApplicationView from "../components/ApplicationView/ApplicationView";
import { useAuth } from "../contexts/AuthProvider";


const HomePage = () => {

    const {auth} = useAuth();
    const isAdmin = auth.role.toLowerCase() === "admin";
    return (
        <div>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="/applications/view/:id" element={<ApplicationView isAdmin={isAdmin} />} />

                <Route path="applications/*" element={<Applications />}/>
            </Routes>
            
        </div>
    );

}

export default HomePage;