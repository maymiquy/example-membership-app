import React from "react";
import Spinner from "../../../components/common/Spinner";
import DashboardLayout from "../../../layouts/DashboardLayout";
import SectionGrid from "../../../components/features/Dashboard/Section/SectionGrid";
import { SquarePlay } from "lucide-react";
import { fetchContents } from "../../../services/content.service";

const VideosPage = (props) => {
 const [video, setVideo] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

 React.useEffect(() => {
  (async () => {
   try {
    const { data } = await fetchContents();
    setVideo(data.videos);
   } catch (error) {
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
    <SectionGrid
     title="Video"
     icon={<SquarePlay className="w-8 h-8 text-gray-700" />}
     data={video}
    />
   )}
  </DashboardLayout>
 );
};

export default VideosPage;
