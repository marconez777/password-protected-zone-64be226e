
import { useSession } from "./useSession";
import { useUserStatus } from "./useUserStatus";
import { useAuthActions } from "./useAuthActions";

export const useAuthState = () => {
  const { user, session, loading, setLoading } = useSession();
  const { isApproved, isAdmin } = useUserStatus(user, setLoading);
  const { signOut } = useAuthActions();

  return {
    user,
    session,
    isApproved,
    isAdmin,
    loading,
    signOut
  };
};
