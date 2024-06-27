import React from "react";
import Navbar from "../components/Guest/Navbar";

const GuestLayout = (props) => {
 return (
  <div className="flex flex-col min-h-screen">
   <Navbar user={props.user} />
   <main className="min-h-[calc(100vh-57px-97px)] flex-1">
    {props.children}
   </main>
  </div>
 );
};

export default GuestLayout;
