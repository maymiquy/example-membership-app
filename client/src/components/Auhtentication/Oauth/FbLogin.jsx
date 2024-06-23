// FbLogin.jsx
import React, { useState, useContext } from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios";
import { UserContext } from "../../../context/userContext";

const FbLogin = () => {
 const { setUser } = useContext(UserContext);
 const [hasLoggedIn, setHasLoggedIn] = useState(false);

 const handleFacebookLogin = async (response) => {
  try {
   const { accessToken } = response;
   const { data } = await axios.post("http://localhost:5000/api/oauth/fb", {
    accessToken,
   });
   const { user, token } = data;
   localStorage.setItem("authToken", token);
   axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
   setUser(user);
   setHasLoggedIn(true);
   window.location.reload();
  } catch (error) {
   console.error("Facebook login failed:", error.message);
   window.location.reload();
  }
 };

 return (
  <>
   {!hasLoggedIn ? (
    <FacebookLogin
     appId={import.meta.env.VITE_FACEBOOK_APP_ID}
     onSuccess={handleFacebookLogin}
     onFail={(error) => console.error("Login gagal:", error)}
     useRedirect
     redirectUri="http://localhost:5173/subscription"
    />
   ) : (
    "Successfully logged in"
   )}
  </>
 );
};

export default FbLogin;
