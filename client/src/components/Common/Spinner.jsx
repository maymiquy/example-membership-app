import React from "react";
import { cn } from "../../lib/utils";

const Spinner = ({ size = "medium", className }) => {
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
    className={cn(
     `spinner border-4 border-primary border-t-transparent rounded-full ${spinnerSize} animate-spin`,
     className,
    )}
   />
  </div>
 );
};

export default Spinner;
