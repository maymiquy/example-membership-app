import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import SubscriptionPage from "./pages/Subscription/SubscriptionPage";
import ProtectedRoute from "./ProtectedRoutes";
import ContentsPage from "./pages/Dashboard/ContentsPage";
import { UserContext } from "./context/userContext";

function App() {
 const { user, loading, error } = useContext(UserContext);
 return (
  <Routes>
   <Route path="/" element={<WelcomePage />} />
   <Route element={<ProtectedRoute />}>
    <Route path="/subscription" element={<SubscriptionPage />} />
    <Route
     path="/dashboard/contents"
     element={<ContentsPage user={user} loading={loading} error={error} />}
    />
   </Route>
  </Routes>
 );
}

export default App;
