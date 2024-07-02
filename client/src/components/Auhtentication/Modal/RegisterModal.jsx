import React, { useState } from "react";
import { Link } from "react-router-dom";

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
import { useToast } from "../../ui/use-toast";
import { regularRegister } from "../../../services/auth.service";

const RegisterModal = () => {
 const [formRegister, setFormRegister] = useState({
  name: "",
  email: "",
  password: "",
 });
 const [error, setError] = useState({
  email: "",
  password: "",
 });
 const [isOpen, setIsOpen] = useState(false);
 const { toast } = useToast();

 const handleRegister = async () => {
  try {
   await regularRegister(
    formRegister.name,
    formRegister.email,
    formRegister.password,
   );

   setIsOpen(false);

   toast({
    title: "Registration Successful",
   });

   setFormRegister({
    name: "",
    email: "",
    password: "",
   });
   setError({
    email: "",
    password: "",
   });
  } catch (error) {
   console.error("Registration failed:", error);

   setIsOpen(true);
   const messageError = error.response.data;
   toast({
    title: "Registration Failed",
    description: messageError.error || messageError.errors[0].msg,
    variant: "destructive",
   });

   if (formRegister.password.length < 6)
    setError({
     email: "",
     password: messageError.errors[0].msg,
    });

   if (!/\S+@\S+\.\S+/.test(formRegister.email))
    setError({
     email: messageError.errors[0].msg,
     password: "",
    });
  }
 };

 const handleInputChange = async (e) => {
  setFormRegister({
   ...formRegister,
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
    <Button variant="secondary" asChild>
     <Link href="/register">Register</Link>
    </Button>
   </DialogTrigger>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Create a new account</DialogTitle>
     <DialogDescription>
      Enter your details below to create a new account.
     </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
     <div className="grid gap-2">
      <Label htmlFor="name">Name</Label>
      <Input
       id="name"
       type="text"
       placeholder="Your Name"
       value={formRegister.name}
       onChange={handleInputChange}
      />
     </div>
     <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input
       id="email"
       type="email"
       placeholder="name@example.com"
       value={formRegister.email}
       onChange={handleInputChange}
       error={error.email}
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
       value={formRegister.password}
       onChange={handleInputChange}
       error={error.password}
      />
      {error.password && (
       <p className="text-red-500 text-xs truncate">{error.password}</p>
      )}
     </div>
     <Button variant="default" onClick={handleRegister}>
      Register
     </Button>
    </div>
    <DialogFooter className="items-center justify-center"></DialogFooter>
   </DialogContent>
  </Dialog>
 );
};

export default RegisterModal;
