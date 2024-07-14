import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useParams } from "react-router-dom";
import Container from "../../../components/common/Container";
import articles from "../../../lib/articles";
import videos from "../../../lib/videos";
import SectionDetails from "../../../components/features/Dashboard/Section/SectionDetails";

const DetailsPage = (props) => {
 const videoRef = useRef(null);
 const [isPlaying, setIsPlaying] = useState(false);
 const [showPlayButton, setShowPlayButton] = useState(false);
 const { id, type } = useParams();

 useEffect(() => {
  setIsPlaying(false);
  setShowPlayButton(false);

  if (videoRef.current) {
   videoRef.current.addEventListener("play", handlePlayEvent);
   videoRef.current.addEventListener("pause", handlePauseEvent);
  }

  return () => {
   if (videoRef.current) {
    videoRef.current.removeEventListener("play", handlePlayEvent);
    videoRef.current.removeEventListener("pause", handlePauseEvent);
   }
  };
 }, [id]);

 const handlePlayEvent = () => {
  setIsPlaying(true);
  setShowPlayButton(true);
  setTimeout(() => {
   setShowPlayButton(false);
  }, 1000);
 };

 const handlePauseEvent = () => {
  setIsPlaying(false);
  setShowPlayButton(true);
  setTimeout(() => {
   setShowPlayButton(false);
  }, 1000);
 };

 const handlePlayPause = () => {
  if (isPlaying) {
   videoRef.current.pause();
  } else {
   videoRef.current.play();
  }
 };

 let data;

 if (type === "article") {
  data = articles.find((a) => a.id === parseInt(id));
 } else if (type === "video") {
  data = videos.find((v) => v.id === parseInt(id));
 } else {
  return (
   <DashboardLayout user={props.user}>
    <Container>
     <h1 className="text-4xl text-center">Invalid content type</h1>
    </Container>
   </DashboardLayout>
  );
 }

 return (
  <DashboardLayout user={props.user}>
   <SectionDetails
    title={data.title}
    imgUrl={type === "article" ? data.imgUrl : null}
    videoUrl={
     type === "video"
      ? "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      : null
    }
    body={data.body || data.description}
    date={
     data.releaseDate?.toLocaleDateString() ||
     data.uploadDate?.toLocaleDateString()
    }
    isPlaying={isPlaying}
    showPlayButton={showPlayButton}
    videoRef={videoRef}
    handlePlayPause={handlePlayPause}
   />
  </DashboardLayout>
 );
};

export default DetailsPage;
