import React from "react";
import articles from "../../../../lib/articles";
import Container from "../../../common/Container";
import { Newspaper } from "lucide-react";
import { cn } from "../../../../lib/utils";
import CardSlider from "../../../common/CardSlider";

const ArticleSlider = (props) => {
 return (
  <Container>
   <div className="flex flex-row gap-4 w-full text-start ps-8 pt-8">
    <h1 className="font-bold text-2xl">Article</h1>
    <span>
     <Newspaper className="w-8 h-8 text-gray-700" />
    </span>
   </div>
   <div className="px-4 md:px-6 py-2 md:py-4 overflow-hidden shadow-inner flex relative w-full">
    <div
     className={cn(
      "flex flex-row overflow-x-scroll w-full items-center gap-4",
      props.className,
     )}
    >
     {articles.map((item, index) => (
      <CardSlider
       key={index}
       title={item.title}
       body={item.body}
       releaseDate={item.releaseDate.toDateString()}
       imgUrl={item.imgUrl}
       href={"/dashboard"}
      />
     ))}
    </div>
   </div>
  </Container>
 );
};

export default ArticleSlider;
