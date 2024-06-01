import { useUser } from "../utils/helpers/serverFetcher";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedPage = () => {
  const { user, isLoading, isError } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if ((!isLoading && !user) || isError) {
    return <Navigate to="/login" />;
  }

  if (!localStorage.getItem("wah")) {
    localStorage.setItem("wah", user!.user_id.toString());
  }

  return <Outlet />;
};

export default ProtectedPage;
