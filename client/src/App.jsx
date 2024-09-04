import React from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import ProtectedRoute from "./ProtectedRoutes";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ArticlesPage from "./pages/Dashboard/Articles/ArticlesPage";
import VideosPage from "./pages/Dashboard/Videos/VideosPage";
import DetailsPage from "./pages/Dashboard/Details/DetailsPage";
import CheckoutStatusPage from "./pages/CheckoutStatus/CheckoutStatusPage";
import { useUserContext } from "./hooks/useUserContext";

function App() {
 const { user, loading } = useUserContext();

 return (
  <Routes>
   <Route path="/" element={<WelcomePage user={user} />} />
   <Route path="/checkout/status" element={<CheckoutStatusPage />} />
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
    <Route
     path="/dashboard/:type/:id"
     element={<DetailsPage user={user} loading={loading} />}
    />
   </Route>
  </Routes>
 );
}

export default App;
