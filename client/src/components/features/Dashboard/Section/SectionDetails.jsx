import React from "react";
import { Play, Pause, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "../../../ui/card";
import { cn } from "../../../../lib/utils";
import { Badge } from "../../../ui/badge";
import Container from "../../../common/Container";
import { Button } from "../../../ui/button";

const SectionDetails = (props) => {
 const navigate = useNavigate();

 const splitTextIntoParagraphs = (text) => {
  const paragraphs = text.split(/[\n]+/);
  return paragraphs.map((paragraph, index) => (
   <CardDescription
    key={index}
    className={cn(
     "text-gray-700 text-sm md:text-md",
     "leading-relaxed",
     "mb-4",
     {
      "indent-8": index === 0 && paragraphs.length > 1,
     },
    )}
   >
    {paragraph.trim()}
   </CardDescription>
  ));
 };

 const handleBack = () => {
  navigate(-1);
 };

 return (
  <Container>
   <Card className="w-full bg-transparent">
    <CardHeader>
     <CardTitle className="text-2xl font-semibold">{props.title}</CardTitle>
    </CardHeader>
    <CardContent>
     {props.imgUrl && (
      <img
       src={props.imgUrl}
       alt={props.title}
       className="rounded-lg mb-4 w-full md:w-1/2"
      />
     )}
     {props.videoUrl && (
      <div className="relative w-full md:w-2/3">
       <video
        ref={props.videoRef}
        src={props.videoUrl}
        className="rounded-lg mb-4 w-full"
        controls
       />
       <div
        className={cn(
         "absolute top-[40%] left-0 w-full flex items-center justify-center",
         {
          "opacity-1 transition-opacity duration-1000": props.showPlayButton,
          "opacity-0 transition-opacity duration-1000": !props.showPlayButton,
         },
        )}
       >
        <button
         className={cn(
          "bg-gray-800 text-white rounded-full p-4 hover:block transition-all",
         )}
         onClick={props.handlePlayPause}
        >
         {props.isPlaying ? <Pause /> : <Play />}
        </button>
       </div>
      </div>
     )}
     <Badge className={"mb-8"}>Published on {props.date}</Badge>
     <>{splitTextIntoParagraphs(props.body)}</>
    </CardContent>
    <CardFooter>
     <Button
      className="font-semibold flex justify-center text-sm md:tex-md items-center w-full py-4"
      variant="outline"
      onClick={handleBack}
     >
      <span>
       <ChevronLeft className="inline-block mr-2" size={18} />
      </span>
      <p>Back</p>
     </Button>
    </CardFooter>
   </Card>
  </Container>
 );
};

export default SectionDetails;
