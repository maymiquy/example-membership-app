import React from "react";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import SubscriptionPage from "./pages/Subscription/SubscriptionPage";
import ProtectedRoute from "./ProtectedRoutes";
import ContentsPage from "./pages/Dashboard/ContentsPage";

function App() {
 return (
  <Routes>
   <Route path="/" element={<WelcomePage />} />
   <Route element={<ProtectedRoute />}>
    <Route path="/subscription" element={<SubscriptionPage />} />
    <Route path="/dashboard/contents" element={<ContentsPage />} />
   </Route>
  </Routes>
 );
}

export default App;
