/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext } from "react";
import { useUser } from "../utils/helpers/serverFetcher";
import { UserData } from "../utils/types";
// import { mutate } from "swr";

export type AuthContextType = {
  user: UserData | null;
  isLoading: boolean;
  isError: any;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading, isError } = useUser();

  //   console.log("User: ", user);
  //   console.log("isLoading: ", isLoading);
  //   console.log("isError: ", isError);

  //   const login = async (credentials) => {};

  //   const logout = async () => {
  //     await mutate(null, false);
  //   };

  return (
    <AuthContext.Provider value={{ user, isLoading, isError }}>
      {children}
    </AuthContext.Provider>
  );
};
