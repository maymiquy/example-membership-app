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

const WelcomePage = (props) => {
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

   window.location.assign(res.url);
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
