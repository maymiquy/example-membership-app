import React from "react";
import { useSidebarToggle } from "../hooks/useSidebarToggle";
import { useStore } from "../hooks/useStore";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { cn } from "../lib/utils";
import Navbar from "../components/Dashboard/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import getMenu from "../lib/menu";

const DashboardLayout = (props) => {
 const sidebar = useStore(useSidebarToggle, (state) => state);
 const [title, setTitle] = React.useState("");
 const pathname = useLocation().pathname;

 React.useEffect(() => {
  const menu = getMenu(pathname);
  setTitle([menu[0].groupLabel, menu[0].menus[0].label].join(""));
 }, [pathname]);

 if (!sidebar) return null;

 return (
  <>
   <div className="flex flex-col min-h-screen">
    <Sidebar />
    <main
     className={cn(
      "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
      sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
     )}
    >
     <Navbar title={title} user={props.user} />
     <div className="container pt-8 pb-8 px-4 sm:px-8">{props.children}</div>
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
