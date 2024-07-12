import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./context/userContext";
import Spinner from "./components/common/Spinner";

const ProtectedRoute = () => {
 const { user } = useContext(UserContext);

 return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
