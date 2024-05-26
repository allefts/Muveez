type UserData = {
  userId: number;
  googleId: string;
  email: string;
  username: string;
  name: string;
  avatarURL: string;
  createdAt: string;
};

//AUTH CONTEXT TYPES
type AuthState = {
  isAuthed: boolean;
  user: UserData | null;
};

type AuthContextType = {
  authState: AuthState;
  setAuthState: (newAuthState: AuthState) => void;
};

export type { AuthState, AuthContextType, UserData };
