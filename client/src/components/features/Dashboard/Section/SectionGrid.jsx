import React from "react";
import CardGrid from "../../../common/CardGrid";
import Container from "../../../common/Container";

const SectionGrid = (props) => {
 return (
  <Container>
   <div className="flex flex-row gap-4 w-full text-start ps-8 pt-8">
    <h1 className="font-bold text-2xl">{props.title}</h1>
    <span>{props.icon}</span>
   </div>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-4 md:px-6 py-2 md:py-4 overflow-hidden shadow-inner relative">
    {props.data.map((item, index) => (
     <CardGrid
      key={index}
      title={item.title}
      body={item.body}
      description={item.description}
      releaseDate={item.releaseDate?.toDateString()}
      uploadDate={item.uploadDate?.toDateString()}
      imgUrl={item.imgUrl}
      thumbnailUrl={item.thumbnailUrl}
      href={`/dashboard/${item.type}/${item.id}`}
     />
    ))}
   </div>
  </Container>
 );
};

export default SectionGrid;
