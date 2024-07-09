import React, { useContext } from "react";
import { Button } from "../../ui/button";
import { GrGoogle } from "react-icons/gr";
import { useGoogleLogin } from "@react-oauth/google";
import { oauthGoogle, storeToken } from "../../../services/auth.service";
import { UserContext } from "../../../context/userContext";

const GoogleLogin = () => {
 const { setUser } = useContext(UserContext);

 const handleGoogleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
   try {
    const { user, token } = await oauthGoogle(tokenResponse.access_token);
    localStorage.setItem("authToken", token);
    if (token) storeToken(token);
    setUser(user);
    window.location.reload();
   } catch (error) {
    console.error("Error during google login:", error.message);
   }
  },
  onError: (error) => {
   console.error("Google login failed:", error);
  },
 });

 return (
  <Button
   variant="outline"
   className="w-[170px] flex flex-row justify-start"
   onClick={() => handleGoogleLogin()}
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
