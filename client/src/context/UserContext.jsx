import React, { createContext, useState, useEffect } from "react";
import { fetchMe } from "../services/user.service";
import cookies from "../utils/cookies";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const token = cookies.get("AUTH-TOKEN");

 useEffect(() => {
  (async () => {
   try {
    if (token) {
     const user = await fetchMe();
     setUser(user);
     setLoading(false);
     setError(null);
    }
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
 }, []);

 return (
  <UserContext.Provider value={{ user, setUser, loading, error }}>
   {children}
  </UserContext.Provider>
 );
};
