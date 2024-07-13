import React from "react";
import CardSlider from "../../../common/CardSlider";
import Container from "../../../common/Container";
import { cn } from "../../../../lib/utils";

const SectionSlider = (props) => {
 return (
  <Container>
   <div className="flex flex-row gap-4 w-full text-start ps-8 pt-8">
    <h1 className="font-bold text-2xl">{props.title}</h1>
    <span>{props.icon}</span>
   </div>
   <div className="px-4 md:px-6 py-2 md:py-4 overflow-hidden shadow-inner flex relative w-full">
    <div
     className={cn(
      "flex flex-row overflow-x-scroll w-full items-center gap-4",
      props.className,
     )}
    >
     {props.data.map((item, index) => (
      <CardSlider
       key={index}
       title={item.title}
       body={item.body}
       description={item.description}
       releaseDate={item.releaseDate?.toDateString()}
       uploadDate={item.uploadDate?.toDateString()}
       imgUrl={item.imgUrl}
       thumbnailUrl={item.thumbnailUrl}
       href={item.href}
      />
     ))}
    </div>
   </div>
  </Container>
 );
};

export default SectionSlider;
