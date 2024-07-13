import React from "react";

const Spinner = ({ size = "medium" }) => {
 let spinnerSize;
 switch (size) {
  case "small":
   spinnerSize = "w-6 h-6";
   break;
  case "large":
   spinnerSize = "w-16 h-16";
   break;
  default:
   spinnerSize = "w-12 h-12";
   break;
 }
 return (
  <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
   <div
    className={`spinner border-4 border-primary border-t-transparent rounded-full ${spinnerSize} animate-spin`}
   />
  </div>
 );
};

export default Spinner;
