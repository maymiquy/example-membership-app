import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import ProtectedRoute from "./ProtectedRoutes";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import { UserContext } from "./context/userContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
 const { user, loading, error } = useContext(UserContext);
 return (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
   <Routes>
    <Route path="/" element={<WelcomePage user={user} />} />
    <Route element={<ProtectedRoute />}>
     <Route
      path="/dashboard"
      element={<DashboardPage user={user} loading={loading} />}
     />
    </Route>
   </Routes>
  </GoogleOAuthProvider>
 );
}

export default App;
