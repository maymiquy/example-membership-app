import React from "react";
import LoginModal from "./Modal/LoginModal";
import RegisterModal from "./Modal/RegisterModal";
import GoogleLogin from "./Oauth/GoogleLogin";
import FbLogin from "./Oauth/FbLogin";

const Authentication = () => {
 return (
  <>
   <div className="flex flex-col items-center justify-center space-y-4">
    <div className="flex w-full items-center justify-center space-x-4 pt-4">
     <LoginModal />
     <RegisterModal />
    </div>
    <div className="flex items-center justify-center w-full">
     <div className="w-1/3 border-b border-zinc-300 mr-4"></div>
     <span className="text-center text-md font-semibold text-foreground">
      or
     </span>
     <div className="w-1/3 border-b border-zinc-300 ml-4"></div>
    </div>
   </div>
   <div className="flex flex-col items-center justify-center space-y-4">
    <GoogleLogin />
    <FbLogin />
   </div>
  </>
 );
};

export default Authentication;
