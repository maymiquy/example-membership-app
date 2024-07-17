import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Spinner from "../../components/common/Spinner";
import SectionSlider from "../../components/features/Dashboard/Section/SectionSlider";
import { Newspaper, SquarePlay } from "lucide-react";
import { fetchContents } from "../../services/content.service";

const DashboardPage = (props) => {
 const [article, setArticle] = React.useState([]);
 const [video, setVideo] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

 React.useEffect(() => {
  (async () => {
   try {
    const { data } = await fetchContents();
    setArticle(data.articles);
    setVideo(data.videos);
   } catch (error) {
    setArticle([]);
    setVideo([]);
    throw new Error(error.message);
   } finally {
    setTimeout(() => {
     setLoading(false);
    }, 700);
   }
  })();
 }, []);

 return (
  <DashboardLayout user={props.user}>
   {loading ? (
    <Spinner size="large" />
   ) : (
    <>
     <SectionSlider
      ider
      title="Article"
      icon={<Newspaper className="w-8 h-8 text-gray-700" />}
      data={article}
     />
     <SectionSlider
      title="Video"
      icon={<SquarePlay className="w-8 h-8 text-gray-700" />}
      data={video}
     />
    </>
   )}
  </DashboardLayout>
 );
};

export default DashboardPage;
