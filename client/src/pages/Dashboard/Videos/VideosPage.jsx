import React, { useMemo, useCallback } from "react";
import Spinner from "../../../components/common/Spinner";
import DashboardLayout from "../../../layouts/DashboardLayout";
import SectionGrid from "../../../components/features/Dashboard/Section/SectionGrid";
import { SquarePlay } from "lucide-react";
import { fetchContents } from "../../../services/content.service";

const VideosPage = (props) => {
 const [video, setVideo] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

 const fetchData = useCallback(async () => {
  try {
   const { data } = await fetchContents();
   setVideo(data.videos);
  } catch (error) {
   setVideo([]);
   throw new Error(error.message);
  } finally {
   setLoading(false);
  }
 }, []);

 React.useEffect(() => {
  fetchData();
 }, [fetchData]);

 const VideoGrid = useMemo(
  () => (
   <SectionGrid
    title="Video"
    icon={<SquarePlay className="w-8 h-8 text-gray-700" />}
    data={video}
   />
  ),
  [video],
 );

 return (
  <DashboardLayout user={props.user}>
   {loading ? <Spinner size="large" /> : VideoGrid}
  </DashboardLayout>
 );
};

export default VideosPage;
