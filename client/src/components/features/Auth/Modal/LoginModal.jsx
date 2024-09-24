import React, { useCallback, useState } from "react";
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
import { regularLogin } from "../../../../services/auth.service";
import { useToast } from "../../../ui/use-toast";
import Spinner from "../../../common/Spinner";

const LoginModal = () => {
 const [loading, setLoading] = useState(false);
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
   const message = await regularLogin(formLogin.email, formLogin.password);
   setLoading(false);
   setIsOpen(false);

   setFormLogin({
    email: "",
    password: "",
   });
   setError({
    email: "",
    password: "",
   });

   toast({
    title: `${message}`,
   });
  } catch (error) {
   console.error("Login failed:", error);
   setIsOpen(true);
   setLoading(false);
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
  } finally {
   window.location.replace("/dashboard");
  }
 };

 const handleInputChange = useCallback(
  async (e) => {
   setFormLogin({
    ...formLogin,
    [e.target.id]: e.target.value,
   });

   setError({
    ...error,
    [e.target.id]: "",
   });
  },
  [formLogin, error],
 );

 const handleKeyDown = (e) => {
  if (e.key === "Enter" && !loading) {
   setLoading(true);
   handleLogin();
  }
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
       onKeyDown={handleKeyDown}
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
       onKeyDown={handleKeyDown}
      />
      {error.password && (
       <p className="text-red-500 text-xs truncate">{error.password}</p>
      )}
     </div>
     <Button
      disabled={loading}
      loading={loading}
      variant="default"
      onClick={() => {
       setLoading(true);
       handleLogin();
      }}
     >
      {loading ? <Spinner size="small" /> : "Login"}
     </Button>
    </div>
    <DialogFooter className="items-center justify-center"></DialogFooter>
   </DialogContent>
  </Dialog>
 );
};

export default LoginModal;
