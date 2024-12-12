import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const AuthGuard = ({ children }) => {
    const { auth } = useAuth();
    return auth ? children : <Navigate to="/login" replace />;
};

export default AuthGuard;
