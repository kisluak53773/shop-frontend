import { createContext, useContext } from "react";
import type { User } from "~/entities/user";

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
};

export const AuthContext = createContext<AuthState | null>(null);

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
