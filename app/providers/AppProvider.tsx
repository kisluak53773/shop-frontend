import type { PropsWithChildren, FC } from "react";
import { QueryProvider } from "./QueryProvider";
import type { AuthState } from "~/features/auth";
import { AuthProvider } from "./AuthProvider";

type Props = {
  auth: AuthState;
} & PropsWithChildren;

export const AppProvider: FC<Props> = ({ auth, children }) => {
  return (
    <QueryProvider>
      <AuthProvider value={auth}>{children}</AuthProvider>
    </QueryProvider>
  );
};
