type UserData = {
  userId: number;
  googleId: string;
  name: string;
  email: string;
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
