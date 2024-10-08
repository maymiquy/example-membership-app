import React from "react";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useMembershipContext } from "../../hooks/useMembershipContext";

const CardGrid = (props) => {
 const { handleMembershipAccess } = useMembershipContext();

 const handleClick = () => {
  handleMembershipAccess(!!props.thumbnailUrl, props.href);
 };

 return (
  <Card className="w-full md:max-w-64 shadow-md rounded-lg border my-1 md:my-2">
   <div className="relative h-40">
    <img
     src={props.imgUrl || props.thumbnailUrl}
     alt={props.title}
     className="object-cover w-full h-full rounded-t-lg"
    />
   </div>
   <CardHeader>
    <CardTitle className="text-start text-lg md:text-xl font-semibold line-clamp-2">
     {props.title}
    </CardTitle>
   </CardHeader>
   <CardContent className="flex flex-col justify-center items-start my-2 px-3 md:px-5 space-y-4">
    <Badge className="text-start text-[10px] text-zinc-200">
     {new Date(props.releaseDate || props.uploadDate).toLocaleDateString(
      "en-GB",
      {
       weekday: "long",
       day: "2-digit",
       month: "2-digit",
       year: "numeric",
      },
     )}
    </Badge>
    <CardDescription className="text-sm md:text-md line-clamp-4 leading-relaxed">
     {props.body || props.description}
    </CardDescription>
   </CardContent>
   <CardFooter className="relative bottom-0 px-6 my-4">
    <Button
     className="w-full font-semibold text-md md:text-md"
     onClick={handleClick}
    >
     {!props.thumbnailUrl ? "Read" : "Watch"}
    </Button>
   </CardFooter>
  </Card>
 );
};

export default CardGrid;
