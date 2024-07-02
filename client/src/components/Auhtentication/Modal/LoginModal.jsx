import React, { useState } from "react";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { regularLogin, storeToken } from "../../../services/auth.service";
import { useToast } from "../../ui/use-toast";

const LoginModal = () => {
 const [formLogin, setFormLogin] = useState({
  email: "",
  password: "",
 });
 const [error, setError] = useState({
  email: "",
  password: "",
 });
 const [isOpen, setIsOpen] = useState(false);
 const { toast } = useToast();

 const handleLogin = async () => {
  try {
   const response = await regularLogin(formLogin.email, formLogin.password);

   console.log(response.data);

   const { token } = response.data;

   localStorage.setItem("authToken", token);
   if (token) storeToken(token);

   setIsOpen(false);

   toast({
    title: "Login Successful",
   });

   setTimeout(() => {
    window.location.reload();
   }, 1500);

   setFormLogin({
    email: "",
    password: "",
   });
   setError({
    email: "",
    password: "",
   });
  } catch (error) {
   console.error("Login failed:", error);

   setIsOpen(true);
   const messageError = error.response.data;

   toast({
    title: "Login Failed",
    description: messageError.error || messageError.errors[0].msg,
    variant: "destructive",
   });

   if (formLogin.password.length < 6)
    setError({
     email: "",
     password: messageError.errors[0].msg,
    });

   if (!/\S+@\S+\.\S+/.test(formLogin.email))
    setError({
     email: messageError.errors[0].msg,
     password: "",
    });
  }
 };

 const handleInputChange = async (e) => {
  setFormLogin({
   ...formLogin,
   [e.target.id]: e.target.value,
  });

  setError({
   ...error,
   [e.target.id]: "",
  });
 };

 return (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
   <DialogTrigger asChild>
    <Button variant="default">Login</Button>
   </DialogTrigger>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Log in to your account</DialogTitle>
     <DialogDescription>
      Enter your email and password below to log in to your account.
     </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
     <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input
       id="email"
       type="email"
       placeholder="name@example.com"
       value={formLogin.email}
       onChange={handleInputChange}
      />
      {error.email && (
       <p className="text-red-500 text-xs truncate">{error.email}</p>
      )}
     </div>
     <div className="grid gap-2">
      <Label htmlFor="password">Password</Label>
      <Input
       id="password"
       type="password"
       placeholder="*******"
       value={formLogin.password}
       onChange={handleInputChange}
      />
      {error.password && (
       <p className="text-red-500 text-xs truncate">{error.password}</p>
      )}
     </div>
     <Button variant="default" onClick={handleLogin}>
      Login
     </Button>
    </div>
    <DialogFooter className="items-center justify-center"></DialogFooter>
   </DialogContent>
  </Dialog>
 );
};

export default LoginModal;
