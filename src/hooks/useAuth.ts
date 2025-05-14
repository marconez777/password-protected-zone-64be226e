
// This file is maintained for compatibility with existing code
// We're now using the AuthProvider directly for authentication
import { useAuth as useAuthProvider } from "@/providers/AuthProvider";

export const useAuth = useAuthProvider;

export default useAuth;
