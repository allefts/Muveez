import useSWR from "swr";
import { serverFetcher } from "../utils/helpers/fetcher";
import { toUser } from "../utils/helpers/toUser";

const useUser = () => {
  const { data, error, isLoading } = useSWR("/user", serverFetcher);

  if (data) {
    return { user: toUser(data), isLoading, error };
  }

  return { user: data, isLoading, error };
};

export { useUser };
