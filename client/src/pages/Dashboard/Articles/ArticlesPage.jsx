import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Spinner from "../../../components/common/Spinner";
import { Newspaper } from "lucide-react";
import SectionGrid from "../../../components/features/Dashboard/Section/SectionGrid";
import { fetchContents } from "../../../services/content.service";

const ArticlesPage = (props) => {
 const [article, setArticle] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

 React.useEffect(() => {
  (async () => {
   try {
    const { data } = await fetchContents();
    setArticle(data.articles);
   } catch (error) {
    setArticle([]);
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
     title="Article"
     icon={<Newspaper className="w-8 h-8 text-gray-700" />}
     data={article}
    />
   )}
  </DashboardLayout>
 );
};

export default ArticlesPage;
