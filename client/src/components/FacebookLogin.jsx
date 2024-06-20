import React, { useState, useEffect } from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios";

const FbLogin = () => {
 const [accessToken, setAccessToken] = useState(null);
 const [user, setUser] = useState(null);

 useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get("access_token");
  if (accessToken) {
   setAccessToken(accessToken);
   sendTokenToServer(accessToken);

   window.history.replaceState({}, document.title, "/");
  }
 }, []);

 const handleFacebookLogin = (response) => {
  setAccessToken(response.accessToken);
  sendTokenToServer(response.accessToken);
 };

 const sendTokenToServer = async (accessToken) => {
  try {
   const res = await axios.post("http://localhost:5000/api/oauth/fb", {
    accessToken,
   });
   const { user, token } = res.data;

   setUser(user);
   localStorage.setItem("authToken", token);

   console.log("Login berhasil:", user);
  } catch (error) {
   console.error("Login gagal:", error.message);
  }
 };

 return (
  <>
   {user ? (
    <div>
     <p>Welcome, {user.name}! your successfully login with Facebook</p>
     <p>Your email: {user.email}</p>
    </div>
   ) : (
    <FacebookLogin
     appId={import.meta.env.VITE_FACEBOOK_APP_ID}
     onSuccess={handleFacebookLogin}
     onFail={(error) => console.error("Login gagal:", error)}
     onProfileSuccess={(profile) => console.log("Profil pengguna:", profile)}
     useRedirect
     disableRedirect={true}
    />
   )}
  </>
 );
};

export default FbLogin;
