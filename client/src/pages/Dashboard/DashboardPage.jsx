import React, { useMemo, useCallback } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Spinner from "../../components/common/Spinner";
import SectionSlider from "../../components/features/Dashboard/Section/SectionSlider";
import { Newspaper, SquarePlay } from "lucide-react";
import { fetchContents } from "../../services/content.service";

const DashboardPage = (props) => {
 const [article, setArticle] = React.useState([]);
 const [video, setVideo] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

 const fetchData = useCallback(async () => {
  try {
   const { data } = await fetchContents();
   setArticle(data.articles);
   setVideo(data.videos);
  } catch (error) {
   setArticle([]);
   setVideo([]);
   throw new Error(error.message);
  } finally {
   setLoading(false);
  }
 }, []);

 React.useEffect(() => {
  fetchData();
 }, [fetchData]);

 const ArticleSlider = useMemo(
  () => (
   <SectionSlider
    title="Article"
    icon={<Newspaper className="w-8 h-8 text-gray-700" />}
    data={article}
   />
  ),
  [article],
 );

 const VideoSlider = useMemo(
  () => (
   <SectionSlider
    title="Video"
    icon={<SquarePlay className="w-8 h-8 text-gray-700" />}
    data={video}
   />
  ),
  [video],
 );

 return (
  <DashboardLayout user={props.user}>
   {loading ? (
    <Spinner size="large" />
   ) : (
    <>
     {ArticleSlider}
     {VideoSlider}
    </>
   )}
  </DashboardLayout>
 );
};

export default DashboardPage;
