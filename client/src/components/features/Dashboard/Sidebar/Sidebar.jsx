import React from "react";
import { useStore } from "../../../../hooks/useStore";
import { useSidebarToggle } from "../../../../hooks/useSidebarToggle";
import Toggle from "./Toggle";
import { Button } from "../../../ui/button";
import { Clover } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../../../lib/utils";
import MenuLink from "../MenuLink";

const Sidebar = () => {
 const sidebar = useStore(useSidebarToggle, (state) => state);

 if (!sidebar) return null;

 return (
  <>
   <aside
    className={cn(
     "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
     sidebar?.isOpen === false ? "w-[90px]" : "w-72",
    )}
   >
    <Toggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
    <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
     <Button
      className={cn(
       "transition-transform ease-in-out duration-300 mb-1",
       sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0",
      )}
      variant="link"
      asChild
     >
      <Link
       to="/"
       className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
      >
       <Clover className="w-6 h-6 mr-3" />
       <span
        className={cn(
         "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
         sidebar?.isOpen === false
          ? "-translate-x-96 opacity-0 hidden"
          : "translate-x-0 opacity-100",
        )}
       >
        Example App
       </span>
      </Link>
     </Button>
     <MenuLink isOpen={sidebar?.isOpen} />
    </div>
   </aside>
  </>
 );
};

export default Sidebar;
