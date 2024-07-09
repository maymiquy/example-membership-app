import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import ProtectedRoute from "./ProtectedRoutes";
import ContentsPage from "./pages/Dashboard/ContentsPage";
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
      path="/contents"
      element={<ContentsPage user={user} loading={loading} error={error} />}
     />
    </Route>
   </Routes>
  </GoogleOAuthProvider>
 );
}

export default App;
