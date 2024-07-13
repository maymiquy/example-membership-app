import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import ProtectedRoute from "./ProtectedRoutes";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import { UserContext } from "./context/userContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ArticlesPage from "./pages/Dashboard/Articles/ArticlesPage";
import VideosPage from "./pages/Dashboard/Videos/VideosPage";

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
     <Route
      path="/dashboard/article"
      element={<ArticlesPage user={user} loading={loading} />}
     />
     <Route
      path="/dashboard/video"
      element={<VideosPage user={user} loading={loading} />}
     />
    </Route>
   </Routes>
  </GoogleOAuthProvider>
 );
}

export default App;
