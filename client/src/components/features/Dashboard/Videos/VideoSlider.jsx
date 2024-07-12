import React from "react";
import { SquarePlay } from "lucide-react";
import { cn } from "../../../../lib/utils";
import Container from "../../../common/Container";
import videos from "../../../../lib/videos";
import CardSlider from "../../../common/CardSlider";

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
      <CardSlider
       key={index}
       title={item.title}
       description={item.description}
       uploadDate={item.uploadDate.toDateString()}
       thumbnailUrl={item.thumbnailUrl}
       href={"/dashboard"}
      />
     ))}
    </div>
   </div>
  </Container>
 );
};

export default VideoSlider;
