import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./context/userContext";
import Spinner from "./components/common/Spinner";

const ProtectedRoute = () => {
 const { user, loading } = useContext(UserContext);

 if (loading)
  return (
   <div className="w-full h-screen flex justify-center items-center">
    <Spinner size="large" />
   </div>
  );

 return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
