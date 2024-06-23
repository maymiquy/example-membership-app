import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./context/userContext";

const ProtectedRoute = () => {
 const { user, loading, error } = useContext(UserContext);

 if (loading) {
  return <div>Loading...</div>;
 }

 if (error) {
  return <div>Error: {error}</div>;
 }

 return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
