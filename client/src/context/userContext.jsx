import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const navigate = useNavigate();

 const token = localStorage.getItem("authToken");

 if (token) {
  axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
 }

 const fetchUser = async () => {
  try {
   const { data } = await axios.get("http://localhost:5000/api/me");
   console.log("data :", data);
   const user = data.data;
   if (user) {
    setUser(user);
    setLoading(false);
    setError(null);
   } else if (data.errors && data.errors.length) {
    setUser(null);
    setLoading(false);
    setError(data.errors[0].msg);
   }
  } catch (error) {
   setUser(null);
   setLoading(false);
   setError("Error fetching user");
  }
 };

 useEffect(() => {
  if (token) {
   fetchUser();
   navigate("/subscription");
  } else {
   setUser(null);
   setLoading(false);
   setError(null);
  }
 }, [token, navigate]);

 return (
  <UserContext.Provider value={{ user, setUser, loading, error }}>
   {children}
  </UserContext.Provider>
 );
};
