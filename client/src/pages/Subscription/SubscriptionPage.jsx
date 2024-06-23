import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";

const SubscriptionPage = () => {
 const { user, loading, error } = useContext(UserContext);

 console.log("user subs:", user);

 if (loading) {
  return <div>Loading...</div>;
 }

 if (error) {
  return <div>Error: {error}</div>;
 }

 return (
  <div>
   <h1>Subscription Page</h1>
   <p>User ID: {user.id}</p>
   <p>User Email: {user.email}</p>
   <p>Stripe Customer ID: {user.membershipType}</p>
   <p>Stripe Customer ID: {user.stripId}</p>
  </div>
 );
};

export default SubscriptionPage;
