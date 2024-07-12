import React from "react";

const Container = (props) => {
 return (
  <section className="bg-zinc-50 shadow-md rounded-md border-px flex flex-col gap-4 justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
   {props.children}
  </section>
 );
};

export default Container;
