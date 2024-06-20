import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FbLogin from "./components/FacebookLogin";

function App() {
 const [count, setCount] = useState(0);

 return (
  <>
   <h1>Vite + React</h1>
   <div className="card">
    <FbLogin />
   </div>
  </>
 );
}

export default App;
