import { ReactNode } from "react";
import { useUser } from "../utils/helpers/serverFetcher";

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, isError } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if ((!isLoading && !user) || isError) {
    ("");
  }

  return <div>{children}</div>;
};

export default ProtectedPage;
