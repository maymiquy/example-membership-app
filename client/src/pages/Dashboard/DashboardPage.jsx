import React, { useContext } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ArticleSlider from "../../components/features/Dashboard/Articles/ArticleSlider";
import VideoSlider from "../../components/features/Dashboard/Videos/VideoSlider";
import Spinner from "../../components/common/Spinner";
import { UserContext } from "../../context/userContext";

const DashboardPage = (props) => {
 return (
  <DashboardLayout user={props.user}>
   {props.loading ? (
    <Spinner size="large" />
   ) : (
    <>
     <ArticleSlider />
     <VideoSlider />
    </>
   )}
  </DashboardLayout>
 );
};

export default DashboardPage;
