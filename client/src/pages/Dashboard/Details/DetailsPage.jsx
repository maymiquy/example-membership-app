import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useParams } from "react-router-dom";
import Container from "../../../components/common/Container";
import SectionDetails from "../../../components/features/Dashboard/Section/SectionDetails";
import {
 fetchSingleArticle,
 fetchSingleVideo,
} from "../../../services/content.service";
import Spinner from "../../../components/common/Spinner";

const DetailsPage = (props) => {
 const videoRef = useRef(null);
 const [item, setItem] = useState(null);
 const [loading, setLoading] = useState(true);
 const [isPlaying, setIsPlaying] = useState(false);
 const [showPlayButton, setShowPlayButton] = useState(false);
 const { id, type } = useParams();

 useEffect(() => {
  const fetchData = async () => {
   try {
    let data;
    if (type === "article") {
     const response = await fetchSingleArticle(id);
     data = response.data;
    } else if (type === "video") {
     const response = await fetchSingleVideo(id);
     data = response.data;
    }
    setItem(data);
   } catch (error) {
    console.error("Error fetching data:", error);
    setItem(null);
   } finally {
    setTimeout(() => {
     setLoading(false);
    }, 700);
   }
  };

  fetchData();
 }, [id, type]);

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

 if (loading) {
  return (
   <DashboardLayout user={props.user}>
    <Container>
     <Spinner />
    </Container>
   </DashboardLayout>
  );
 }

 if (!item) {
  return (
   <DashboardLayout user={props.user}>
    <Container>
     <h1 className="text-4xl text-center">Oopss, Content not found</h1>
    </Container>
   </DashboardLayout>
  );
 }

 return (
  <DashboardLayout user={props.user}>
   <SectionDetails
    title={item.title}
    imgUrl={type === "article" ? item.imgUrl : null}
    videoUrl={type === "video" ? item.videoUrl : null}
    body={item.body || item.description}
    date={new Date(item.releaseDate || item.uploadDate).toLocaleDateString(
     "en-GB",
     {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
     },
    )}
    isPlaying={isPlaying}
    showPlayButton={showPlayButton}
    videoRef={videoRef}
    handlePlayPause={handlePlayPause}
   />
  </DashboardLayout>
 );
};

export default DetailsPage;
