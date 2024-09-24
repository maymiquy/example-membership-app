import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "./hooks/useUserContext";

const ProtectedRoute = () => {
 const { user } = useUserContext();

 return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
