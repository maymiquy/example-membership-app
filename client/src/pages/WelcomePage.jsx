import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { Banana } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import LoginModal from "../components/Auhtentication/Modal/LoginModal";
import RegisterModal from "../components/Auhtentication/Modal/RegisterModal";
import FbLogin from "../components/Auhtentication/Oauth/FbLogin";
import { GrGoogle } from "react-icons/gr";
import { SiFacebook } from "react-icons/si";

const WelcomePage = () => {
 return (
  <div className="flex flex-col min-h-screen">
   <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40 shadow-sm">
    <div className="container h-14 flex items-center">
     <Link
      href="/"
      className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
     >
      <Banana className="w-6 h-6 mr-3" />
      <span className="font-bold">Example App</span>
     </Link>
     <nav className="ml-auto flex items-center gap-2">
      <Button
       variant="outline"
       size="icon"
       className="rounded-full w-8 h-8 bg-background"
       asChild
      >
       <Link href="https://github.com/maymiquy">
        <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
       </Link>
      </Button>
     </nav>
    </div>
   </header>
   <main className="min-h-[calc(100vh-57px-97px)] flex-1">
    <div className="container relative pb-10">
     <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
      <Banana className="w-16 h-16 mb-4" />
      <h1 className="text-center text-2xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
       Welcome to Example App
      </h1>
      <span className="max-w-[750px] text-center text-lg font-light text-foreground">
       Njoy anytime and anywhere, Unlimited articles & videos.
      </span>
      <div className="flex w-full items-center justify-center space-x-4 pt-4">
       <LoginModal />
       <RegisterModal />
      </div>
      <span className="text-center text-md font-semibold text-foreground">
       or
      </span>
      <div className="flex flex-col items-center justify-center space-y-4">
       <Button variant="outline" className="w-48" asChild>
        <Link>
         <GrGoogle className="mr-2" size="18px" />
         Login with Google
        </Link>
       </Button>
       <Button variant="outline" className="w-48" asChild>
        <span>
         <SiFacebook className="mr-2" size="18px" />
         <FbLogin />
        </span>
       </Button>
      </div>
     </section>
    </div>
   </main>
  </div>
 );
};

export default WelcomePage;
