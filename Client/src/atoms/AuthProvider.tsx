import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { fetchCurrentUser } from "../utils/helpers/Fetcher";
import { UserData } from "../utils/types";

//AUTH CONTEXT TYPES
type AuthState = {
  isAuthed: boolean;
  user: UserData | null;
};

type AuthContextType = {
  authState: AuthState;
  setAuthState: (newAuthState: AuthState) => void;
};

const initialState: AuthContextType = {
  authState: {
    isAuthed: false,
    user: null,
  },
  setAuthState: () => {},
};

const AuthContext = createContext<AuthContextType>(initialState);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState(initialState.authState);

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

  const value = useMemo(
    () => ({ authState, setAuthState }),
    [authState, setAuthState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
