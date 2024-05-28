import { ReactNode, createContext, useMemo } from "react";
import { UserData } from "../utils/types";
import { useUser } from "../utils/helpers/serverFetcher";

type ContextType = {
  user: UserData | null;
};

const AuthContext = createContext<ContextType>({ user: null });

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, isError } = useUser();

  if (isLoading) {
    console.log("Loading Context...");
  }

  if (isError) {
    console.log("Error in Context!");
  }

  if (user) {
    console.log("User Loaded!");
  }

  const value = useMemo(() => ({ user }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
