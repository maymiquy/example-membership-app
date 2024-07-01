import React from "react";
import { Button } from "../../ui/button";
import { GrGoogle } from "react-icons/gr";

const GoogleLogin = () => {
 return (
  <Button
   variant="outline"
   className="w-[170px] flex flex-row justify-start"
   asChild
  >
   <span className="gap-2 cursor-pointer">
    <GrGoogle size="18px" />
    Login Google
   </span>
  </Button>
 );
};

export default GoogleLogin;
