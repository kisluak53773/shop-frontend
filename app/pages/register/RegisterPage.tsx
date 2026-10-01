import type { FC } from "react";
import { useActionData, type MetaFunction } from "react-router";
import { RegisterForm } from "~/features/auth";
import type { registerAction } from "./action.server";

export const meta: MetaFunction = () => [{ title: "Create account" }];

export const RegisterPage: FC = () => {
  const data = useActionData<typeof registerAction>();

  return (
    <div className="mx-auto max-w-sm p-8">
      <h1 className="mb-6 text-2xl font-semibold">Create account</h1>
      <RegisterForm error={data?.error} />
    </div>
  );
};
