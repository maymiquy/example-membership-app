import React, { useState } from "react";
import { Button } from "../../../ui/button";
import { GrGoogle } from "react-icons/gr";
import { useGoogleLogin } from "@react-oauth/google";
import { oauthGoogle, storeToken } from "../../../../services/auth.service";
import { toast } from "../../../ui/use-toast";
import { useUserContext } from "../../../../hooks/useUserContext";
import Spinner from "../../../common/Spinner";

const GoogleLogin = () => {
 const { setUser } = useUserContext();
 const [loading, setLoading] = useState(false);

 const handleGoogleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
   try {
    const { user, token } = await oauthGoogle(tokenResponse.access_token);
    localStorage.setItem("authToken", token);
    if (token) storeToken(token);
    setUser(user);

    setLoading(false);
    toast({
     title: "Login Successful",
    });
   } catch (error) {
    console.error("Error during google login:", error.message);
    setLoading(false);
    toast({
     title: "Login Failed",
     description: messageError.error || messageError.errors[0].msg,
     variant: "destructive",
    });
   } finally {
    setLoading(false);
   }
  },
  onError: (error) => {
   console.error("Google login failed:", error);
   const messageError = error.response.data;
   setLoading(false);
   toast({
    title: "Login Failed",
    description: messageError.error || messageError.errors[0].msg,
    variant: "destructive",
   });
  },
  onNonOAuthError: () => {
   setLoading(false);
   toast({
    title: "Login Failed",
    description: "Login with Google has canceled",
    variant: "destructive",
   });
  },
 });

 const handleClick = (event) => {
  if (loading) {
   event.preventDefault();
   event.stopPropagation();
  } else {
   setLoading(true);
   handleGoogleLogin();
  }
 };

 return (
  <Button
   disabled={loading}
   loading={loading}
   variant="outline"
   className={`w-[160px] flex flex-row justify-center`}
   onClick={handleClick}
   asChild
  >
   <span className={`gap-2 ${loading ? "cursor-progress" : "cursor-pointer"}`}>
    {loading ? (
     <>
      <Spinner size="small" />
     </>
    ) : (
     <>
      <GrGoogle size="18px" />
     </>
    )}
   </span>
  </Button>
 );
};

export default GoogleLogin;
