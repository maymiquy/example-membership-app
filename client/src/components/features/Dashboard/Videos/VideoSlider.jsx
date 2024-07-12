import React from "react";
import { SquarePlay } from "lucide-react";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "../../../ui/card";
import { Button } from "../../../ui/button";
import { cn } from "../../../../lib/utils";
import Container from "../../../common/Container";
import videos from "../../../../lib/videos";

const VideoSlider = (props) => {
 return (
  <Container>
   <div className="flex flex-row gap-4 w-full text-start ps-8 pt-8">
    <h1 className="font-bold text-2xl">Video</h1>
    <span>
     <SquarePlay className="w-8 h-8 text-gray-700" />
    </span>
   </div>
   <div className="px-4 md:px-6 py-2 md:py-4 overflow-hidden shadow-inner flex relative w-full">
    <div
     className={cn(
      "flex flex-row overflow-x-scroll w-full items-center gap-4",
      props.className,
     )}
    >
     {videos.map((item, index) => (
      <Card
       key={index}
       className="min-w-full md:min-w-72 shadow-md rounded-lg border my-1 md:my-2"
      >
       <div className="relative h-40">
        <img
         src={item.thumbnailUrl}
         alt={item.title}
         className="object-cover w-full h-full rounded-t-lg"
        />
       </div>
       <CardHeader>
        <CardTitle className="text-center text-xl md:text-3xl font-semibold">
         {item.title}
        </CardTitle>
       </CardHeader>
       <CardContent className="flex flex-col justify-center items-center my-4 px-3 md:px-5 space-y-4">
        <CardDescription className="text-start text-xs text-gray-500 w-full">
         {item.uploadDate.toLocaleDateString()}
        </CardDescription>
        <p className="text-sm md:text-md line-clamp-4">{item.description}</p>
       </CardContent>
       <CardFooter className="relative bottom-0 px-6 my-4">
        <Button
         className="w-full font-semibold text-md md:text-md"
         onClick={() => {}}
        >
         Watch now
        </Button>
       </CardFooter>
      </Card>
     ))}
    </div>
   </div>
  </Container>
 );
};

export default VideoSlider;
