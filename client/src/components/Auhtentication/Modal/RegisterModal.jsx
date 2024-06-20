import React from "react";
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

const RegisterModal = () => {
 return (
  <Dialog>
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
      <Input id="name" type="text" placeholder="Your Name" />
     </div>
     <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="name@example.com" />
     </div>
     <div className="grid gap-2">
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" placeholder="*******" />
     </div>
     <Button variant="default">Register</Button>
    </div>
    <DialogFooter className="items-center justify-center"></DialogFooter>
   </DialogContent>
  </Dialog>
 );
};

export default RegisterModal;
