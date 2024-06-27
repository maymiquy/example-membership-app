import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Card, CardContent } from "../../components/ui/card";

const ContentsPage = (props) => {
 if (props.loading) {
  return <div>Loading...</div>;
 }

 if (props.error) {
  return <div>Error: {error}</div>;
 }

 return (
  <DashboardLayout user={props.user}>
   <Card className="rounded-lg border-none mt-6">
    <CardContent className="p-6">
     <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
      <div className="flex flex-col relative">
       <div>
        <h1>Contents Page</h1>
        <p>User ID: {props.user.id}</p>
        <p>User Email: {props.user.email}</p>
        <p>Membership: {props.user.membershipType}</p>
        <p>Stripe Customer ID: {props.user.stripId}</p>
       </div>
      </div>
     </div>
    </CardContent>
   </Card>
  </DashboardLayout>
 );
};

export default ContentsPage;
