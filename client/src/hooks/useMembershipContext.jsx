import { useContext } from "react";
import { MembershipContext } from "../context/MembershipContext";

export const useMembershipContext = () => {
 const {
  articleCount,
  videoCount,
  membershipType,
  articleLimit,
  videoLimit,
  limitArticleCount,
  limitVideoCount,
  handleMembershipAccess,
 } = useContext(MembershipContext);

 return {
  articleCount,
  videoCount,
  membershipType,
  articleLimit,
  videoLimit,
  limitArticleCount,
  limitVideoCount,
  handleMembershipAccess,
 };
};
