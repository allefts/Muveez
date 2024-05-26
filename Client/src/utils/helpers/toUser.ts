import { UserData } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toUser = (obj: any) => {
  const user = {} as UserData;

  user.userId = parseInt(obj.user_id);
  user.googleId = obj.google_id;
  user.name = obj.name;
  user.username = obj.username;
  user.email = obj.email;
  user.avatarURL = obj.avatar_url;
  user.createdAt = obj.created_at;

  return user;
};

export { toUser };
