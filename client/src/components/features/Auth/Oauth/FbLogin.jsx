// FbLogin.jsx
import React, { useState, useContext } from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { UserContext } from "../../../../context/userContext";
import { oauthFacebook, storeToken } from "../../../../services/auth.service";
import { Button } from "../../../ui/button";
import { SiFacebook } from "react-icons/si";
import { toast } from "../../../ui/use-toast";

const FbLogin = () => {
 const { setUser } = useContext(UserContext);
 const [isError, setIsError] = useState(false);

 const handleFacebookLogin = async (response) => {
  try {
   const { accessToken } = response;
   const { data } = await oauthFacebook(accessToken);
   const { user, token } = data;
   localStorage.setItem("authToken", token);
   if (token) storeToken(token);
   setUser(user);

   toast({
    title: "Login Successful",
   });
  } catch (error) {
   console.error("Facebook login failed:", error.message);
   const messageError = error.response.data;

   toast({
    title: "Login Failed",
    description: messageError.error || messageError.errors[0].msg,
    variant: "destructive",
   });

   setIsError(true);
  }
 };

 return (
  <>
   {!isError ? (
    <FacebookLogin
     appId={import.meta.env.VITE_FACEBOOK_APP_ID}
     onSuccess={handleFacebookLogin}
     onFail={(error) => console.error("Login gagal:", error)}
     useRedirect={false}
     children={
      <Button
       variant="outline"
       className="w-[170px] flex flex-row justify-start"
       asChild
      >
       <span className="gap-2 cursor-pointer">
        <SiFacebook size="18px" />
        Login Facebook
       </span>
      </Button>
     }
    />
   ) : (
    "Failed to login. Please try again."
   )}
  </>
 );
};

export default FbLogin;
