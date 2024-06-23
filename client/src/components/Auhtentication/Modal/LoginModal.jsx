import React, { useState } from "react";
import axios from "axios";
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

const LoginModal = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [errorMessage, setErrorMessage] = useState("");

 const handleLogin = async () => {
  try {
   const response = await axios.post("http://localhost:5000/api/login", {
    email,
    password,
   });

   console.log(response.data);

   const { token } = response.data;

   localStorage.setItem("authToken", token);
   axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

   window.location.reload();
  } catch (error) {
   console.error("Login failed:", error.message);
   setErrorMessage("Invalid credentials");
  }
 };

 return (
  <Dialog>
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
       value={email}
       onChange={(e) => setEmail(e.target.value)}
      />
      {errorMessage && (
       <p className="text-red-500 text-xs truncate">{errorMessage}</p>
      )}
     </div>
     <div className="grid gap-2">
      <Label htmlFor="password">Password</Label>
      <Input
       id="password"
       type="password"
       placeholder="*******"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && (
       <p className="text-red-500 text-xs truncate">{errorMessage}</p>
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
