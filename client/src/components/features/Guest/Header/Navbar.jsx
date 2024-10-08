import React from "react";
import { Link } from "react-router-dom";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Clover } from "lucide-react";

import { Button } from "../../../ui/button";
import UserAvatar from "./UserAvatar";

const Navbar = (props) => {
 return (
  <>
   <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40 shadow-sm">
    <div className="container h-14 flex items-center">
     <Link
      href="/"
      className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
     >
      <Clover className="w-6 h-6 mr-3" />
      <span className="font-bold">Example App</span>
     </Link>
     <nav className="ml-auto flex items-center gap-2">
      {!props.user ? (
       <Button
        variant="outline"
        size="icon"
        className="rounded-full w-8 h-8 bg-background"
        asChild
       >
        <a href="https://github.com/maymiquy">
         <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
        </a>
       </Button>
      ) : (
       <UserAvatar user={props.user} />
      )}
     </nav>
    </div>
   </header>
  </>
 );
};

export default Navbar;
