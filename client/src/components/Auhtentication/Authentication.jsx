import React from "react";
import LoginModal from "./Modal/LoginModal";
import RegisterModal from "./Modal/RegisterModal";
import GoogleLogin from "./Oauth/GoogleLogin";
import FbLogin from "./Oauth/FbLogin";

const Authentication = () => {
 return (
  <>
   <div className="flex w-full items-center justify-center space-x-4 pt-4">
    <LoginModal />
    <RegisterModal />
   </div>
   <span className="text-center text-md font-semibold text-foreground">or</span>
   <div className="flex flex-col items-center justify-center space-y-4">
    <GoogleLogin />
    <FbLogin />
   </div>
  </>
 );
};

export default Authentication;
