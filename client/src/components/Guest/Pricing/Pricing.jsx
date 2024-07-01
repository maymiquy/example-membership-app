import React from "react";
import { Button } from "../../ui/button";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "../../ui/card";
import { Infinity, Newspaper, SquarePlay } from "lucide-react";
import { cn } from "../../../lib/utils";

const Pricing = (props) => {
 const pricingList = {
  Basic: {
   article: {
    value: "3",
    icon: <Newspaper className="w-5 h-5 text-gray-700" />,
   },
   video: {
    value: "3",
    icon: <SquarePlay className="w-5 h-5 text-gray-700" />,
   },
  },
  Premium: {
   article: {
    value: "10",
    icon: <Newspaper className="w-5 h-5 text-gray-700" />,
   },
   video: {
    value: "10",
    icon: <SquarePlay className="w-5 h-5 text-gray-700" />,
   },
  },
  Platinum: {
   article: {
    value: <Infinity className="w-6 h-6 text-gray-700" />,
    icon: <Newspaper className="w-5 h-5 text-gray-700" />,
   },
   video: {
    value: <Infinity className="w-6 h-6 text-gray-700" />,
    icon: <SquarePlay className="w-5 h-5 text-gray-700" />,
   },
  },
 };

 return (
  <div
   className={cn(
    "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 py-6 md:py-10",
    props.className,
   )}
  >
   {props.membership.map((item, index) => {
    let membershipName;
    if (item.unit_amount === 2900000) {
     membershipName = "Platinum";
    } else if (item.unit_amount === 1900000) {
     membershipName = "Premium";
    } else {
     membershipName = "Basic";
    }

    const formattedPrice = new Intl.NumberFormat("id-ID", {
     style: "currency",
     currency: "IDR",
     minimumFractionDigits: 2,
     maximumFractionDigits: 2,
    }).format(item.unit_amount / 100);

    return (
     <Card key={index}>
      <CardHeader>
       <CardTitle className="text-center text-xl md:text-3xl font-semibold">
        {membershipName}
       </CardTitle>
      </CardHeader>
      <CardDescription className="text-center md:text-lg">
       {formattedPrice}
      </CardDescription>
      <CardContent className="flex flex-col justify-center items-center my-4 space-y-4">
       <ul className="flex flex-col space-y-4">
        <li className="flex items-center space-x-2">
         {pricingList[membershipName].article.icon}
         <span>{pricingList[membershipName].article.value}</span>
         <p className="text-sm">Articles</p>
        </li>
        <li className="flex items-center space-x-2">
         {pricingList[membershipName].video.icon}
         <span>{pricingList[membershipName].article.value}</span>
         <p className="text-sm">Videos</p>
        </li>
       </ul>
      </CardContent>
      <CardFooter className="relative bottom-0 px-6 my-4">
       <Button
        className="w-full font-semibold text-md md:text-md"
        onClick={() => props.onClick(item.id)}
       >
        Subscribe
       </Button>
      </CardFooter>
     </Card>
    );
   })}
  </div>
 );
};

export default Pricing;
