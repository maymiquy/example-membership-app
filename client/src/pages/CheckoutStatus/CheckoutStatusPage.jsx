import { useState, useEffect } from "react";
import { postSuccessCheckout } from "../../services/membership.service";
import CheckoutStatus from "../../components/common/CheckoutStatus";

const CheckoutStatusPage = ({ sessionId }) => {
 const [timeRemaining, setTimeRemaining] = useState(5);
 const [error, setError] = useState(false);

 useEffect(() => {
  const requestTimeout = setTimeout(() => {
   const updatedSucceesSession = async () => {
    try {
     await postSuccessCheckout(sessionId);
    } catch (err) {
     console.error("Error processing checkout success:", err);
     setError(true);
    }
   };
   updatedSucceesSession();
  }, 500);

  const redirectTimeout = setTimeout(() => {
   if (error) {
    return (window.location.href = "/");
   } else {
    return (window.location.href = "/dashboard");
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
 }, [sessionId, error]);

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