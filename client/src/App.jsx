import React from "react";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";

function App() {
 return (
  <Routes>
   <Route path="/" element={<WelcomePage />} />
  </Routes>
 );
}

export default App;
