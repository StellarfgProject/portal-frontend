import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const RoleGuard = ({ allowedRoles, children }) => {
    const { auth } = useAuth();

    const hasAccess = auth && allowedRoles.includes(auth.role);

    return hasAccess ? children : <Navigate to="/unauthorized" replace />;
};

export default RoleGuard;
