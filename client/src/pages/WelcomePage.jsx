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

const WelcomePage = (props) => {
 const navigate = useNavigate();
 const [membership, setMembership] = useState([]);
 const [loading, setLoading] = useState(true);

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
   const res = await postSubscription(priceId);

   document.cookie = `invoice_id=${res.id}; expires=${new Date(
    Date.now() + 15 * 60 * 1000,
   )}; path=/`;
   window.location.assign(res.invoiceUrl);
  } catch (error) {
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
    />
   )}
  </GuestLayout>
 );
};

export default WelcomePage;
