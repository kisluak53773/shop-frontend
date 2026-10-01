import type { FC } from "react";
import { useActionData, type MetaFunction } from "react-router";
import { LoginForm } from "~/features/auth";
import type { loginAction } from "./action.server";

export const meta: MetaFunction = () => [{ title: "Sign in" }];

export const LoginPage: FC = () => {
  const data = useActionData<typeof loginAction>();
  
  return (
    <div className="mx-auto max-w-sm p-8">
      <h1 className="mb-6 text-2xl font-semibold">Sign in</h1>
      <LoginForm error={data?.error} />
    </div>
  );
};
