import React from "react";
import { logout } from "../../../../services/auth.service";

import { LogOut, User } from "lucide-react";

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuGroup,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from "../../../ui/tooltip";
import { Button } from "../../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../../hooks/useUserContext";
import { toast } from "../../../ui/use-toast";

const UserAvatar = (props) => {
 const { setUser } = useUserContext();
 const navigate = useNavigate();
 const userAvatar = `${props.user.name.charAt(0).toUpperCase()}${props.user.name
  .split(" ")
  [props.user.name.split(" ").length - 1].charAt(0)
  .toUpperCase()}`;

 return (
  <>
   <DropdownMenu>
    <TooltipProvider disableHoverableContent>
     <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
       <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative h-8 w-8 rounded-full">
         <Avatar className="h-8 w-8">
          <AvatarImage src="#" alt="Avatar" />
          <AvatarFallback className="bg-transparent">
           {props.user.name ? userAvatar : "n/a"}
          </AvatarFallback>
         </Avatar>
        </Button>
       </DropdownMenuTrigger>
      </TooltipTrigger>
      <TooltipContent side="bottom">Account</TooltipContent>
     </Tooltip>
    </TooltipProvider>

    <DropdownMenuContent className="w-56" align="end" forceMount>
     <DropdownMenuLabel className="font-normal">
      <span className="relative flex items-center px-2 py-1.5 text-sm">
       <User className="w-4 h-4 mr-3 text-muted-foreground" />
       Account Information
      </span>
     </DropdownMenuLabel>
     <DropdownMenuSeparator />
     <DropdownMenuGroup>
      <div className="relative flex flex-col space-y-2 px-2 py-1.5">
       <p className="text-sm font-medium leading-none">{props.user.name}</p>
       <p className="text-xs leading-none text-muted-foreground">
        {props.user.email}
       </p>
       <p className="text-xs truncate text-muted-foreground">
        <span className="font-semibold text-gray-800">Member</span>
        <span className="ml-1 mr-1 font bold">:</span>
        {props.user.membershipType ? props.user.membershipType : "-"}
       </p>
       <p className="text-xs truncate text-muted-foreground">
        <span className="font-semibold text-gray-800">Daily Limit</span>
        <span className="ml-1 mr-1 font bold">: </span>
        {props.user.membershipType === "Basic"
         ? "3"
         : props.user.membershipType === "Premium"
         ? "10"
         : props.user.membershipType === "Platinum"
         ? "Unlimited"
         : "-"}
       </p>
      </div>
     </DropdownMenuGroup>
     <DropdownMenuSeparator />
     <DropdownMenuItem
      className="hover:cursor-pointer"
      onClick={async () => {
       try {
        const res = await logout();
        setUser(null);
        if (res.status === 200) navigate("/");
       } catch (error) {
        throw new Error(error);
       } finally {
        toast({
         title: "Logout Successfully",
        });
       }
      }}
     >
      <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
      Sign out
     </DropdownMenuItem>
    </DropdownMenuContent>
   </DropdownMenu>
  </>
 );
};

export default UserAvatar;
