
import { useContext } from "react";
import { AuthContext } from "../providers/auth/authContext";

export const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
