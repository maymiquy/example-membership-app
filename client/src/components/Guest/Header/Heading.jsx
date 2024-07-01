import { Banana } from "lucide-react";
import React from "react";

const Heading = (props) => {
 return (
  <>
  {!props.user && <Banana className="w-16 h-16 mb-4" />}
   <h1 className="text-center text-2xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
    {props.user ? `Welcome, ${props.user.name}` : "Welcome to Example App"}
   </h1>
   <span className="max-w-[750px] text-center text-md md:text-lg font-light text-foreground lg:text-nowrap">
    {props.user
     ? `Subscribe to join, njoy anytime and anywhere unlimited articles & videos.`
     : "Njoy anytime and anywhere, Unlimited articles & videos."}
   </span>
  </>
 );
};

export default Heading;
