import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import AuthGuard from "./guards/AuthGuard";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Redirect /home to / */}
                    <Route path="/home" element={<Navigate to="/" replace />} />

                    {/* Public Route */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes */}
                    <Route
                        path="/*"
                        element={
                            <AuthGuard>
                                <HomePage />
                            </AuthGuard>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
