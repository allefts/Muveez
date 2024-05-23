import { UserData } from "../types";

//Gets user from user-session cookie
const fetchCurrentUser = async () => {
  const currUser: UserData = {
    userId: 0,
    googleId: "",
    name: "",
    email: "",
    createdAt: "",
    avatarURL: "",
  };

  try {
    const res = await fetch("http://localhost:8000/user", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();

    if (data.email && data.name) {
      currUser.userId = parseInt(data.user_id);
      currUser.googleId = data.google_id;
      currUser.name = data.name;
      currUser.email = data.email;
      currUser.avatarURL = data.avatar_url;
      currUser.createdAt = data.created_at;

      return currUser;
    } else {
      return "Error";
    }
  } catch (err) {
    return "Error";
  }
};

export { fetchCurrentUser };
