import React, { useMemo, useCallback } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Spinner from "../../../components/common/Spinner";
import { Newspaper } from "lucide-react";
import SectionGrid from "../../../components/features/Dashboard/Section/SectionGrid";
import { fetchContents } from "../../../services/content.service";

const ArticlesPage = (props) => {
 const [article, setArticle] = React.useState([]);
 const [loading, setLoading] = React.useState(true);

 const fetchData = useCallback(async () => {
  try {
   const { data } = await fetchContents();
   setArticle(data.articles);
  } catch (error) {
   setArticle([]);
   throw new Error(error.message);
  } finally {
   setLoading(false);
  }
 }, []);

 React.useEffect(() => {
  fetchData();
 }, [fetchData]);

 const ArticleGrid = useMemo(
  () => (
   <SectionGrid
    title="Article"
    icon={<Newspaper className="w-8 h-8 text-gray-700" />}
    data={article}
   />
  ),
  [article],
 );

 return (
  <DashboardLayout user={props.user}>
   {loading ? <Spinner size="large" /> : ArticleGrid}
  </DashboardLayout>
 );
};

export default ArticlesPage;
