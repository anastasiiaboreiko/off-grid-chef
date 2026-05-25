import { createContext } from "react";
import type { User } from "../types/User";
import type { UserRegistration } from "../types/UserRegistration";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: Pick<UserRegistration, "email" | "password">) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: UserRegistration) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
})