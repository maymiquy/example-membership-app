import React from "react";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import SubscriptionPage from "./pages/Subscription/SubscriptionPage";

function App() {
 return (
  <Routes>
   <Route path="/" element={<WelcomePage />} />
   <Route path="/subscription" element={<SubscriptionPage />} />
  </Routes>
 );
}

export default App;
