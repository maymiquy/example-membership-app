import React from "react";
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Banana, MenuIcon, PanelsTopLeft } from "lucide-react";
import { Link } from "react-router-dom";
import MenuLink from "../MenuLink";

const DialogMenu = () => {
 return (
  <>
   <Dialog>
    <DialogTrigger className="lg:hidden" asChild>
     <Button className="h-8" variant="outline" size="icon">
      <MenuIcon size={20} />
     </Button>
    </DialogTrigger>
    <DialogContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
     <DialogHeader>
      <Button
       className="flex justify-center items-center pb-2 pt-1"
       variant="link"
       asChild
      >
       <Link
        href="/"
        className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
       >
        <Banana className="w-6 h-6 mr-3" />
        <span className="font-bold">Example App</span>
       </Link>
      </Button>
     </DialogHeader>
     <MenuLink isOpen />
    </DialogContent>
   </Dialog>
  </>
 );
};

export default DialogMenu;
