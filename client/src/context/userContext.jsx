import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMe } from "../services/user.service";
import { storeToken } from "../services/auth.service";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const navigate = useNavigate();
 console.log(user);

 const token = localStorage.getItem("authToken");

 if (token) storeToken(token);

 useEffect(() => {
  (async () => {
   try {
    const user = await fetchMe();
    setUser(user);
    setLoading(false);
    setError(null);
    user.membershipType ? navigate("/dashboard") : navigate("/");
   } catch (error) {
    setUser(null);
    setLoading(false);
    setError("Error fetching user: " + error.message);
   }
  })();

  if (!token) {
   setUser(null);
   setLoading(false);
   setError(null);
  }
 }, [token]);

 return (
  <UserContext.Provider value={{ user, setUser, loading, error }}>
   {children}
  </UserContext.Provider>
 );
};
