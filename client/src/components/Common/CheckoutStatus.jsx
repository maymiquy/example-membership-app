import React from "react";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "../ui/card";
import { CircleCheck, CircleX } from "lucide-react";
import { Button } from "../ui/button";

const CheckoutStatus = (props) => {
 return (
  <Card className="max-w-md shadow-md bg-zinc-100 rounded-md">
   <CardHeader>
    <CardTitle>Subscription {props.error ? "Failed" : "Success"}</CardTitle>
   </CardHeader>
   <CardContent className="text-md py-4 px-6 space-y-5">
    <p>
     {props.error ? "Oops" : "Congratulations"}! Your subscription membership
     has been {props.error ? "failed" : "successfully"}.
    </p>
    <span className="w-full flex items-center justify-center">
     {props.error ? (
      <CircleX size={100} className="bg-red-600 rounded-full text-white" />
     ) : (
      <CircleCheck
       size={100}
       className="bg-green-600 rounded-full text-white"
      />
     )}
    </span>
    <CardDescription className="text-[10px] text-center text-gray-600">
     You will be redirected to the{" "}
     {props.error ? "subscription page" : "dashboard page"} in{" "}
     {props.timeRemaining} second
     {props.timeRemaining !== 1 ? "s" : ""}.
    </CardDescription>
    <CardFooter className="flex justify-end mt-4">
     <Button
      variant="ghost"
      className="w-full underline font-semibold truncate text-zinc-600 hover:text-zinc-800"
      onClick={props.onClick}
     >
      Go to {props.error ? "Subscription" : "Dashboard"}
     </Button>
    </CardFooter>
   </CardContent>
  </Card>
 );
};

export default CheckoutStatus;
