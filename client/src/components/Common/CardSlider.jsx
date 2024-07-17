import React, { useContext } from "react";
import { Button } from "../ui/button";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { MembershipContext } from "../../context/MembershipContext";

const CardSlider = (props) => {
 const { handleMembershipAccess } = useContext(MembershipContext);

 const handleClick = () => {
  handleMembershipAccess(!!props.thumbnailUrl, props.href);
 };
 return (
  <>
   <Card className="min-w-full md:min-w-72 shadow-md rounded-lg border my-1 md:my-2">
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
    <CardContent className="flex flex-col justify-center items-start my-4 px-3 md:px-5 space-y-4">
     <Badge className="text-start text-[10px] text-zinc-200">
      {props.releaseDate || props.uploadDate}
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
  </>
 );
};

export default CardSlider;
