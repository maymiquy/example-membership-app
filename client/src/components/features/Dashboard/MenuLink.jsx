import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { logout } from "../../../services/auth.service";

import { Ellipsis, LogOut } from "lucide-react";

import { ScrollArea } from "../../ui/scroll-area";
import { Button } from "../../ui/button";
import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from "../../ui/tooltip";

import { cn } from "../../../lib/utils";
import getMenu from "../../../lib/menu";
import { toast } from "../../ui/use-toast";
import { useUserContext } from "../../../hooks/useUserContext";

const MenuLink = ({ isOpen }) => {
 const { setUser } = useUserContext();
 const navigate = useNavigate();
 const pathname = useLocation().pathname;
 const menuList = getMenu(pathname);

 return (
  <>
   <ScrollArea className="[&>div>div[style]]:!block">
    <nav className="mt-8 h-full w-full">
     <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
      {menuList.map(({ groupLabel, menus }, index) => (
       <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
        {(isOpen && groupLabel) || isOpen === undefined ? (
         <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
          {groupLabel}
         </p>
        ) : !isOpen && isOpen !== undefined && groupLabel ? (
         <TooltipProvider>
          <Tooltip delayDuration={100}>
           <TooltipTrigger className="w-full">
            <div className="w-full flex justify-center items-center">
             <Ellipsis className="h-5 w-5" />
            </div>
           </TooltipTrigger>
           <TooltipContent side="right">
            <p>{groupLabel}</p>
           </TooltipContent>
          </Tooltip>
         </TooltipProvider>
        ) : (
         <p className="pb-2"></p>
        )}
        {menus.map(({ label, href, active, icon: Icon, submenus }, index) =>
         submenus.length === 0 ? (
          <div className="w-full" key={index}>
           <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
             <TooltipTrigger asChild>
              <Button
               variant={active ? "secondary" : "ghost"}
               className="w-full justify-start h-10 mb-1"
               asChild
              >
               <Link to={href}>
                <span className={cn(isOpen === false ? "" : "mr-4")}>
                 <Icon size={18} />
                </span>
                <p
                 className={cn(
                  "max-w-[200px] truncate",
                  isOpen === false
                   ? "-translate-x-96 opacity-0"
                   : "translate-x-0 opacity-100",
                 )}
                >
                 {label}
                </p>
               </Link>
              </Button>
             </TooltipTrigger>
             {isOpen === false && (
              <TooltipContent side="right">{label}</TooltipContent>
             )}
            </Tooltip>
           </TooltipProvider>
          </div>
         ) : (
          <div className="w-full" key={index}>
           {/* TODO: Make Submenu */}
           {/* <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                      /> */}
          </div>
         ),
        )}
       </li>
      ))}
      <li className="w-full grow flex items-end">
       <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
         <TooltipTrigger asChild>
          <Button
           onClick={async () => {
            try {
             const res = await logout();
             setUser(null);
             if (res.status === 200) navigate("/");
            } catch (error) {
             throw new Error(error);
            } finally {
             toast({
              title: `Logout Successfully`,
             });
            }
           }}
           variant="outline"
           className="w-full justify-center h-10 my-5 hover:outline hover:outline-1 hover:outline-red-500"
          >
           <span className={cn(isOpen === false ? "" : "mr-4")}>
            <LogOut size={18} />
           </span>
           <p
            className={cn(
             "whitespace-nowrap",
             isOpen === false ? "opacity-0 hidden" : "opacity-100",
            )}
           >
            Sign out
           </p>
          </Button>
         </TooltipTrigger>
         {isOpen === false && (
          <TooltipContent side="right">Sign out</TooltipContent>
         )}
        </Tooltip>
       </TooltipProvider>
      </li>
     </ul>
    </nav>
   </ScrollArea>
  </>
 );
};

export default MenuLink;
