import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Home from "../components/Home";
import Applications from "../components/Applications";
import ApplicationView from "../components/ApplicationView";


const HomePage = () => {

    return (
        <div>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="/applications/view/:id" element={<ApplicationView isAdmin={true} />} />

                <Route path="applications/*" element={<Applications />} />
            </Routes>
            
        </div>
    );

}

export default HomePage;