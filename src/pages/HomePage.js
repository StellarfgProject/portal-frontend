import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Home from "../components/Home";
import Applications from "../components/Applications";


const HomePage = () => {

    return (
        <div>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="applications/*" element={<Applications />} />
            </Routes>
            
        </div>
    );

}

export default HomePage;