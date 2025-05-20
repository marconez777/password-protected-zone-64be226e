
import { useContext } from "react";
import { useAuth as useAuthFromProvider } from "@/providers/auth";

export const useAuth = useAuthFromProvider;

export default useAuth;
