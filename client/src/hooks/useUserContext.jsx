import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useUserContext = () => {
 const { user, loading, error, setUser } = useContext(UserContext);

 return { user, loading, error, setUser };
};
