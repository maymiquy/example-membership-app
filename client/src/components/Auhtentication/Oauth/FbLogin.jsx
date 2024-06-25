// FbLogin.jsx
import React, { useState, useContext } from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { UserContext } from "../../../context/userContext";
import { oauthFacebook, storeToken } from "../../../services/auth.service";

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
   window.location.reload();
  } catch (error) {
   console.error("Facebook login failed:", error.message);
   window.location.reload();
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
    />
   ) : (
    "Failed to login. Please try again."
   )}
  </>
 );
};

export default FbLogin;
