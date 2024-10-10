import { useContext } from "react";
import { AuthContextType, AuthContext } from "../../context/AuthContext";

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  } else {
    return ctx;
  }
};
