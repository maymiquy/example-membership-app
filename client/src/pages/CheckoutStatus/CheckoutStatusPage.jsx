import { useState, useEffect } from "react";
import { postSuccessCheckout } from "../../services/membership.service";
import CheckoutStatus from "../../components/common/CheckoutStatus";
import cookies from "../../utils/cookies";

const CheckoutStatusPage = () => {
 const [timeRemaining, setTimeRemaining] = useState(5);
 const [error, setError] = useState(false);
 const invoice_id = cookies.get("invoice_id");

 useEffect(() => {
  const requestTimeout = setTimeout(() => {
   const updatedSucceesSession = async () => {
    try {
     await postSuccessCheckout(invoice_id);
    } catch (err) {
     console.error("Error processing checkout success:", err);
     setError(true);
     cookies.remove("invoice_id");
    }
   };
   updatedSucceesSession();
  }, 700);

  const redirectTimeout = setTimeout(async () => {
   if (error) {
    return (window.location.href = "/");
    cookies.remove("invoice_id");
   } else {
    return (window.location.href = "/dashboard");
    cookies.remove("invoice_id");
   }
  }, 5000);

  const countdownInterval = setInterval(() => {
   setTimeRemaining((prevTime) => prevTime - 1);
  }, 1000);

  return () => {
   clearTimeout(requestTimeout);
   clearTimeout(redirectTimeout);
   clearInterval(countdownInterval);
  };
 }, [invoice_id, error]);

 return (
  <div className="flex justify-center items-center h-screen bg-zinc-200">
   <CheckoutStatus
    timeRemaining={timeRemaining}
    onClick={() =>
     error ? window.location.assign("/") : window.location.assign("/dashboard")
    }
    error={error}
   />
  </div>
 );
};

export default CheckoutStatusPage;
