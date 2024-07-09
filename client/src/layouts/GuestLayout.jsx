import React from "react";

import Navbar from "../components/features/Guest/Header/Navbar";

import { Toaster } from "../components/ui/toaster";

const GuestLayout = (props) => {
 return (
  <div className="flex flex-col min-h-screen">
   <Navbar user={props.user} />
   <main className="min-h-[calc(100vh-57px-97px)] flex-1">
    <div className="container relative pb-10">
     <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-14 lg:pb-6">
      {props.children}
     </section>
     <Toaster />
    </div>
   </main>
  </div>
 );
};

export default GuestLayout;
