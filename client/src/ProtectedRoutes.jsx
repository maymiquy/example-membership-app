import React, { useEffect } from "react";
import {
 matchPath,
 Navigate,
 Outlet,
 useLocation,
 useNavigate,
} from "react-router-dom";
import { useUserContext } from "./hooks/useUserContext";
import { toast } from "./components/ui/use-toast";

const ProtectedRoute = () => {
 const { user } = useUserContext();
 const location = useLocation();
 const navigate = useNavigate();

 useEffect(() => {
  const match = matchPath("/dashboard/:type/:id", location.pathname);
  if (match) {
   const { params } = match;
   const { type, id } = params;
   const currentPath = `/dashboard/${type}/${id}`;
   if (
    user.articleLimit < 1 &&
    type === "article" &&
    location.pathname === currentPath
   ) {
    navigate("/dashboard");
    toast({
     title: "Opps sorry, error while go back",
     description: "Error: Cannot go back to previous page",
     variant: "destructive",
    });
   } else if (
    user.videoLimit < 1 &&
    type === "video" &&
    location.pathname === currentPath
   ) {
    navigate("/dashboard");
    toast({
     title: "Opps sorry, error while go back",
     description: "Error: Cannot go back to previous page",
     variant: "destructive",
    });
   }
  }
 }, [location, user, navigate]);

 return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
