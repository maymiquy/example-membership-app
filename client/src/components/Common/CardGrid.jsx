import React from "react";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "../ui/card";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const CardGrid = (props) => {
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
    <CardTitle className="text-center text-xl md:text-3xl font-semibold">
     {props.title}
    </CardTitle>
   </CardHeader>
   <CardContent className="flex flex-col justify-center items-center my-4 px-3 md:px-5 space-y-4">
    <CardDescription className="text-start text-xs text-gray-500 w-full">
     {props.releaseDate || props.uploadDate}
    </CardDescription>
    <p className="text-sm md:text-md line-clamp-4">
     {props.body || props.description}
    </p>
   </CardContent>
   <CardFooter className="relative bottom-0 px-6 my-4">
    <Link to={props.href}>
     <Button
      className="w-full font-semibold text-md md:text-md"
      onClick={() => {}}
     >
      {!props.thumbnailUrl ? "Read" : "Watch"}
     </Button>
    </Link>
   </CardFooter>
  </Card>
 );
};

export default CardGrid;
