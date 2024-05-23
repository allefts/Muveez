import { Dispatch, SetStateAction } from "react";

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

interface AuthContextInterface {
  authState: AuthState;
  setAuthState: Dispatch<SetStateAction<AuthState>>;
}

type AuthProvideProps = {
  children: React.ReactNode;
};

export type { UserData, AuthContextInterface, AuthProvideProps, AuthState };
