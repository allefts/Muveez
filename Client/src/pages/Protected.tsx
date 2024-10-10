import Spinner from "../components/Global/Spinner";
import { useUser } from "../utils/helpers/serverFetcher";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedPage = () => {
  const { user, isLoading, isError } = useUser();

  if (isLoading) {
    return <Spinner size={50} color="#4a90e2" />;
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
