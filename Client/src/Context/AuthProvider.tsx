import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { AuthContextType, UserData } from "../utils/types";
import { fetchCurrentUser } from "../utils/helpers/fetcher";

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
        localStorage.removeItem("user");
        setAuthState({ isAuthed: false, user: null });
        console.log("Signed Out");
      } else {
        localStorage.setItem("user", "1");
        setAuthState({ isAuthed: true, user: user });
        console.log("Signed In");
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
