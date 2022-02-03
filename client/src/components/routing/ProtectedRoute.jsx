import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/esm/Spinner";

const ProtectedRoute = ({ children }) => {
    const { authState } = useContext(AuthContext);
    const { authLoading, isAuthenticated } = authState;

    if (authLoading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
