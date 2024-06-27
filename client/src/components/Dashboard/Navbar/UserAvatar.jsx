import React, { useContext } from "react";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuGroup,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from "../../ui/tooltip";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { LogOut, User } from "lucide-react";
import { UserContext } from "../../../context/userContext";
import { logout } from "../../../services/auth.service";

const UserAvatar = () => {
 const { user } = useContext(UserContext);
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
          <AvatarFallback className="bg-transparent">JD</AvatarFallback>
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
      <span className="relative flex flex-col space-y-2 px-2 py-1.5">
       <p className="text-sm font-medium leading-none">{user.name}</p>
       <p className="text-xs leading-none text-muted-foreground">
        {user.email}
       </p>
       <p className="text-xs truncate text-muted-foreground">
        <span className="font-semibold text-gray-800">Type</span>
        <span className="ml-[18px] mr-1 font bold">:</span>
        {user.membershipType}
       </p>
       <p className="text-xs truncate text-muted-foreground">
        <span className="font-semibold text-gray-800">Cust ID</span>
        <span className="ml-1 mr-1 font bold">:</span>
        {user.stripId}
       </p>
      </span>
     </DropdownMenuGroup>
     <DropdownMenuSeparator />
     <DropdownMenuItem
      className="hover:cursor-pointer"
      onClick={async () => {
       localStorage.removeItem("authToken");
       const res = await logout();
       if (res.status === 200) window.location.reload();
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
