import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Redirect } from "wouter";

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Redirect to="/login" replace={true} />;
  }

  return <div>{children}</div>;
};

export default ProtectedPage;
