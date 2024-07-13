import React from "react";
import { Link } from "react-router-dom";
import {
 Breadcrumb,
 BreadcrumbItem,
 BreadcrumbLink,
 BreadcrumbList,
 BreadcrumbPage,
 BreadcrumbSeparator,
} from "../ui/breadcrumb";

const Breadcrumbs = (props) => {
 return (
  <Breadcrumb>
   <BreadcrumbList>
    {props.menu.map((item, index) => (
     <React.Fragment key={index}>
      <BreadcrumbItem>
       {props.menu.length - 1 === index ? (
        <BreadcrumbPage>{item.label}</BreadcrumbPage>
       ) : (
        <BreadcrumbLink asChild>
         <Link to={item.href}>{item.label}</Link>
        </BreadcrumbLink>
       )}
      </BreadcrumbItem>
      {index < props.menu.length - 1 && <BreadcrumbSeparator />}
     </React.Fragment>
    ))}
   </BreadcrumbList>
  </Breadcrumb>
 );
};

export default Breadcrumbs;
