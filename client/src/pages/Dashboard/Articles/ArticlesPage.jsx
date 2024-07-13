import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Spinner from "../../../components/common/Spinner";
import articles from "../../../lib/articles";
import { Newspaper } from "lucide-react";
import SectionGrid from "../../../components/features/Dashboard/Section/SectionGrid";

const ArticlesPage = (props) => {
 const [article, setArticle] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

 React.useEffect(() => {
  (async () => {
   try {
    const data = await articles;
    setArticle(data);
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
