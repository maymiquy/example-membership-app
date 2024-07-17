import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "../components/ui/use-toast";
import {
 countUserArticleLimit,
 countUserVideoLimit,
} from "../services/membership.service";
import { fetchMe } from "../services/user.service";

export const MembershipContext = createContext();

export const MembershipProvider = ({ children }) => {
 const navigate = useNavigate();

 const [articleCount, setArticleCount] = useState(0);
 const [videoCount, setVideoCount] = useState(0);
 const [membershipType, setMembershipType] = useState(null);
 const [articleLimit, setArticleLimit] = useState(0);
 const [videoLimit, setVideoLimit] = useState(0);
 const [userEmail, setUserEmail] = useState("");

 useEffect(() => {
  const fetchUserData = async () => {
   try {
    const user = await fetchMe();
    setMembershipType(user.membershipType);
    setArticleLimit(user.articleLimit);
    setVideoLimit(user.videoLimit);
    setUserEmail(user.email);
    setArticleCount(user.articleLimit);
    setVideoCount(user.videoLimit);
   } catch (error) {
    console.error("Error fetching user data:", error);
   }
  };
  fetchUserData();
 }, [navigate]);

 const limitArticleCount = useCallback(async () => {
  try {
   await countUserArticleLimit(userEmail);
   setArticleCount((prevCount) => prevCount - 1);
  } catch (error) {
   console.error("Error incrementing user article limit:", error);
  }
 }, [userEmail]);

 const limitVideoCount = useCallback(async () => {
  try {
   await countUserVideoLimit(userEmail);
   setVideoCount((prevCount) => prevCount - 1);
  } catch (error) {
   console.error("Error incrementing user video limit:", error);
  }
 }, [userEmail]);

 const handleMembershipAccess = (isThumbnail, href) => {
  if (isThumbnail) {
   if (videoCount == 0) {
    toast({
     title: "You have reached your video access daily limit.",
     description: `Your video daily limit: ${
      membershipType === "Basic"
       ? "3 times"
       : membershipType === "Premium"
       ? "10 times"
       : "Unlimited"
     } access per day`,
     variant: "destructive",
    });
    return;
   }
   limitVideoCount();
  } else {
   if (articleCount == 0) {
    toast({
     title: "You have reached your article access daily limit.",
     description: `Your article daily limit: ${
      membershipType === "Basic"
       ? "3 times"
       : membershipType === "Premium"
       ? "10 times"
       : "Unlimited"
     } access per day`,
     variant: "destructive",
    });
    return;
   }
   limitArticleCount();
  }
  navigate(href);
 };

 const value = {
  articleCount,
  videoCount,
  membershipType,
  articleLimit,
  videoLimit,
  limitArticleCount,
  limitVideoCount,
  handleMembershipAccess,
 };

 return (
  <MembershipContext.Provider value={value}>
   {children}
  </MembershipContext.Provider>
 );
};
