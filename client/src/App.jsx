import React from "react";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import SubscriptionPage from "./pages/Subscription/SubscriptionPage";
import ProtectedRoute from "./ProtectedRoutes";

function App() {
 return (
  <Routes>
   <Route path="/" element={<WelcomePage />} />
   <Route element={<ProtectedRoute />}>
    <Route path="/subscription" element={<SubscriptionPage />} />
   </Route>
  </Routes>
 );
}

export default App;
