import React, { useEffect, useState } from "react";

import GuestLayout from "../layouts/GuestLayout";

import Heading from "../components/features/Guest/Header/Heading";
import Spinner from "../components/common/Spinner";

import {
 fetchMembership,
 postSubscription,
} from "../services/membership.service";
import Authentication from "../components/features/Auth/Authentication";
import Pricing from "../components/features/Guest/Pricing/Pricing";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookies";

const WelcomePage = (props) => {
 const navigate = useNavigate();
 const [membership, setMembership] = useState([]);
 const [loading, setLoading] = useState(true);
 const [isProcessing, setIsProcessing] = useState(false);

 useEffect(() => {
  (async () => {
   try {
    const data = await fetchMembership();
    setMembership(
     data.slice(0, 3).sort((a, b) => a.unit_amount - b.unit_amount),
    );
    setLoading(false);
   } catch (error) {
    setMembership([]);
    setLoading(false);
    throw new Error(error.message);
   }
  })();
 }, [props.user]);

 if (props.error) {
  return <div>Error: {error}</div>;
 }

 const handleSubscription = async (priceId) => {
  try {
   setIsProcessing(true);
   const res = await postSubscription(priceId);

   cookies.set("invoice_id", res.id, {
    expires: new Date(new Date().getTime() + 15 * 60 * 1000),
    path: "/",
   });
   setIsProcessing(false);
   window.location.assign(res.invoiceUrl);
  } catch (error) {
   setIsProcessing(true);
   cookies.remove("invoice_id");
   setIsProcessing(false);
   throw new Error(error.message);
  }
 };

 return (
  <GuestLayout user={props.user}>
   <Heading user={props.user} />
   {!props.user ? (
    loading ? (
     <Spinner size="large" />
    ) : (
     <Authentication />
    )
   ) : loading ? (
    <Spinner size="large" />
   ) : props.user.membershipType ? (
    navigate("/dashboard")
   ) : (
    <Pricing
     className={`${loading ? "hidden" : ""}`}
     membership={membership}
     onClick={handleSubscription}
     loading={isProcessing}
    />
   )}
  </GuestLayout>
 );
};

export default WelcomePage;
