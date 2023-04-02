import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthRoutes = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        // return <Navigate to="/unauthorized" />;
        return <Navigate to="/" />;
    }
    return <Outlet />;
};

export default AuthRoutes;
