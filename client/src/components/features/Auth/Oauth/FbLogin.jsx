import React, { useState } from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { oauthFacebook, storeToken } from "../../../../services/auth.service";
import { Button } from "../../../ui/button";
import { SiFacebook } from "react-icons/si";
import { toast } from "../../../ui/use-toast";
import { useUserContext } from "../../../../hooks/useUserContext";
import Spinner from "../../../common/Spinner";

const FbLogin = () => {
 const { setUser } = useUserContext();
 const [isLoading, setIsLoading] = useState(false);

 const onSuccess = async (response) => {
  try {
   setIsLoading(true);
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
   const messageError = error.response.data;

   toast({
    title: "Login Failed",
    description: messageError.error || messageError.errors[0].msg,
    variant: "destructive",
   });
  } finally {
   setIsLoading(false);
  }
 };

 const onError = (error) => {
  console.error("Login Facebook Failed:", error);
  setIsLoading(false);
  toast({
   title: "Login Failed",
   description: "Login with Facebook has canceled",
   variant: "destructive",
  });
 };

 const handleOnClick = () => {
  if (!isLoading) {
   setIsLoading(true);
  }
 };

 return (
  <Button variant="outline" disabled={isLoading} className="p-0 bg-transparent">
   <FacebookLogin
    appId={import.meta.env.VITE_FACEBOOK_APP_ID}
    onSuccess={(res) => onSuccess(res)}
    onFail={(error) => onError(error)}
    useRedirect={false}
    className="w-auto h-auto"
    disabled={isLoading}
    children={
     <Button
      variant="outline"
      className={`w-[160px] flex flex-row justify-center`}
      asChild
      onClick={handleOnClick}
      disabled={isLoading}
     >
      <span
       className={`gap-2 ${isLoading ? "cursor-progress" : "cursor-pointer"}`}
      >
       {isLoading ? (
        <Spinner size="small" />
       ) : (
        <>
         <SiFacebook size="18px" />
        </>
       )}
      </span>
     </Button>
    }
   />
  </Button>
 );
};

export default FbLogin;
