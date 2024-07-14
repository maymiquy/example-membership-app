import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSidebarToggle } from "../hooks/useSidebarToggle";
import { useStore } from "../hooks/useStore";

import { cn } from "../lib/utils";

import Sidebar from "../components/features/Dashboard/Sidebar/Sidebar";
import Navbar from "../components/features/Dashboard/Navbar/Navbar";
import Breadcrumbs from "../components/common/Breadcrumbs";

import getMenu from "../lib/menu";
import { Toaster } from "../components/ui/toaster";

const DashboardLayout = (props) => {
 const sidebar = useStore(useSidebarToggle, (state) => state);
 const { type } = useParams();
 const [title, setTitle] = React.useState("");
 const [breadcrumbList, setBreadcrumbList] = React.useState([]);
 const pathname = useLocation().pathname;
 const menuList = getMenu(pathname);
 const menus = menuList.map(({ menus }) => menus);
 const { label = "", href = "" } = menus
  .flat()
  .find((item) => item.href === pathname) ?? {
  label: `Detail ${type.charAt(0).toUpperCase() + type.slice(1)}`,
  href: "",
 };

 React.useEffect(() => {
  setTitle(label);

  const breadcrumbItems = [{ label: label, href: href }];
  if (pathname !== "/dashboard") {
   breadcrumbItems.unshift({ label: "Dashboard", href: "/dashboard" });
  }

  setBreadcrumbList(breadcrumbItems);
 }, [pathname, label, href]);

 if (!sidebar) return null;

 return (
  <>
   <div className="flex flex-col min-h-screen">
    <Sidebar />
    <main
     className={cn(
      "min-h-[calc(100vh_-_56px)] bg-zinc-100 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
      sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
     )}
    >
     <Navbar title={title} user={props.user} />
     <div className="container space-y-2 md:space-y-4 py-6 px-4 sm:px-8">
      <Breadcrumbs menu={breadcrumbList} />
      {props.children}
     </div>
     <Toaster />
    </main>
    <footer
     className={cn(
      "transition-[margin-left] ease-in-out duration-300",
      sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
     )}
    >
     {/* <Footer /> */}
    </footer>
   </div>
  </>
 );
};

export default DashboardLayout;
