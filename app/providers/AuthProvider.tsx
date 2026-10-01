import type { PropsWithChildren, FC } from "react";
import { AuthContext, type AuthState } from "~/features/auth/model/auth-context";

type Props = {
  value: AuthState;
} & PropsWithChildren;

export const AuthProvider: FC<Props> = ({ value, children }) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
