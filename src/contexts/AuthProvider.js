import React, { createContext, useContext, useState } from "react";

// Create Context
const AuthContext = createContext();

// Custom Hook for Accessing Auth Context
export const useAuth = () => useContext(AuthContext);

// Provider Component
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        // Initialize state from sessionStorage
        const savedAuth = sessionStorage.getItem("auth");
        return savedAuth ? JSON.parse(savedAuth) : null;
    });

    const login = (data) => {
        setAuth(data);
        sessionStorage.setItem("auth", JSON.stringify(data));
    };

    const logout = () => {
        setAuth(null);
        sessionStorage.removeItem("auth");
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
