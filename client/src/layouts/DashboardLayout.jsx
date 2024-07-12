import React from "react";
import { useLocation } from "react-router-dom";
import { useSidebarToggle } from "../hooks/useSidebarToggle";
import { useStore } from "../hooks/useStore";

import { cn } from "../lib/utils";

import Sidebar from "../components/features/Dashboard/Sidebar/Sidebar";
import Navbar from "../components/features/Dashboard/Navbar/Navbar";

import getMenu from "../lib/menu";
import { Link } from "react-router-dom";
import {
 Breadcrumb,
 BreadcrumbItem,
 BreadcrumbLink,
 BreadcrumbList,
 BreadcrumbPage,
 BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

const DashboardLayout = (props) => {
 const sidebar = useStore(useSidebarToggle, (state) => state);
 const [title, setTitle] = React.useState("");
 const [breadcrumbList, setBreadcrumbList] = React.useState([]);
 const pathname = useLocation().pathname;
 const menuList = getMenu(pathname);
 const menus = menuList.map(({ menus }) => menus);
 const { label, href } = menus.flat().find((item) => item.href === pathname);

 React.useEffect(() => {
  setTitle(label);
  console.log(pathname, label, href);

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
      <Breadcrumb>
       <BreadcrumbList>
        {breadcrumbList.map((item, index) => (
         <React.Fragment key={index}>
          <BreadcrumbItem>
           {breadcrumbList.length - 1 === index ? (
            <BreadcrumbPage>{item.label}</BreadcrumbPage>
           ) : (
            <BreadcrumbLink asChild>
             <Link to={item.href}>{item.label}</Link>
            </BreadcrumbLink>
           )}
          </BreadcrumbItem>
          {index < breadcrumbList.length - 1 && <BreadcrumbSeparator />}
         </React.Fragment>
        ))}
       </BreadcrumbList>
      </Breadcrumb>

      {props.children}
     </div>
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
