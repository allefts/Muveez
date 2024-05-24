import { useContext } from "react";
import { AuthContext } from "../atoms/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedPage = () => {
  const { authState } = useContext(AuthContext);

  console.log(authState);

  if (!authState.isAuthed) return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectedPage;
