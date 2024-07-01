import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import ProtectedRoute from "./ProtectedRoutes";
import ContentsPage from "./pages/Dashboard/ContentsPage";
import { UserContext } from "./context/userContext";

function App() {
 const { user, loading, error } = useContext(UserContext);
 return (
  <Routes>
   <Route path="/" element={<WelcomePage user={user} />} />
   <Route element={<ProtectedRoute />}>
    <Route
     path="/contents"
     element={<ContentsPage user={user} loading={loading} error={error} />}
    />
   </Route>
  </Routes>
 );
}

export default App;
