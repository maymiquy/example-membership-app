import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Card, CardContent } from "../../components/ui/card";

const ContentsPage = () => {
 const { user, loading, error } = useContext(UserContext);

 console.log("user subs:", user);

 if (loading) {
  return <div>Loading...</div>;
 }

 if (error) {
  return <div>Error: {error}</div>;
 }

 return (
  <DashboardLayout>
   <Card className="rounded-lg border-none mt-6">
    <CardContent className="p-6">
     <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
      <div className="flex flex-col relative">
       <div>
        <h1>Contents Page</h1>
        <p>User ID: {user.id}</p>
        <p>User Email: {user.email}</p>
        <p>Membership: {user.membershipType}</p>
        <p>Stripe Customer ID: {user.stripId}</p>
       </div>
      </div>
     </div>
    </CardContent>
   </Card>
  </DashboardLayout>
 );
};

export default ContentsPage;
