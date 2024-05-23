import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { fetchCurrentUser } from "../utils/helpers/Fetcher";
import { AuthContextInterface, AuthState, UserData } from "../utils/types";

const initState = {
  authState: {
    isAuthed: false,
    user: null,
  },
  setAuthState: (authState: AuthState) => {
    authState;
  },
} as AuthContextInterface;

const AuthContext = createContext<AuthContextInterface>(initState);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthed: false,
    user: null,
  });

  useEffect(() => {
    const getAuthStatus = async () => {
      const user: UserData | string = await fetchCurrentUser();
      if (typeof user == "string") {
        console.log("Signed Out");
        setAuthState({ isAuthed: false, user: null });
      } else {
        console.log("Signed In");
        setAuthState({ isAuthed: true, user: user });
      }
    };

    getAuthStatus();
  }, []);

  const value = useMemo(() => ({ authState, setAuthState }), [authState]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
