/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserData } from "../types";

const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  //   return <AuthContext.Provider>{children}</AuthContext.Provider>;
  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        const res = await fetch("http://localhost:8000/user", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.log(err);
        setIsAuthed(false);
        setUserData(null);
      }
    };

    getAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthed, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { useAuthContext, AuthProvider };
