
import { createContext } from "react";
import { Session, User } from "@supabase/supabase-js";

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  isApproved: boolean;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isApproved: false,
  isAdmin: false,
  loading: true,
  signOut: async () => {},
});
