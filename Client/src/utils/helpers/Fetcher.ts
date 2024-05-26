import axios from "axios";
import { toUser } from "./toUser";

const serverAPI = axios.create({
  baseURL: "http://localhost:8000",
  responseType: "json",
  responseEncoding: "utf8",
  withCredentials: true,
});

// const movieAPI = axios.create({
//   baseURL: "https://api.themoviedb.org/3",
//   responseType: "json",
//   responseEncoding: "utf8",
//   withCredentials: true,
//   headers: { Authorization: "Bearer" + "" },
// });

const serverFetcher = async (url: string) => {
  const res = await serverAPI.get(url);

  if (res.status !== 200) {
    return Error("Unable to fetch");
  }
  return res.data;
};

//Gets user from user-session cookie
const fetchCurrentUser = async () => {
  try {
    const res = await serverAPI.request({
      url: "/user",
      method: "get",
    });

    if (res.status !== 200) {
      return "Error";
    }

    return toUser(res.data);
  } catch (err) {
    return "Error";
  }
};

const fetchUserLists = async () => {
  try {
    const res = await serverAPI.request({ url: "/user/lists", method: "get" });
    if (res.status !== 200) {
      return "Error";
    }

    console.log("User Lists: ", res);
  } catch (err) {
    return "Error";
  }
};

export { serverFetcher, fetchUserLists, fetchCurrentUser };
