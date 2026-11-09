import type { FC } from "react";
import { Form, useLoaderData, type MetaFunction } from "react-router";
import { Button } from "~/shared/ui";
import type { accountLoader } from "./loader.server";

export const meta: MetaFunction = () => [{ title: "Your account" }];

export const AccountPage: FC = () => {
  const { user } = useLoaderData<typeof accountLoader>();

  return (
    <div className="mx-auto max-w-md space-y-4 p-8">
      <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-sm text-gray-600">Role: {user.role}</p>
      <Form method="post" action="/logout">
        <Button type="submit" variant="outline" fullWidth>
          Sign out
        </Button>
      </Form>
    </div>
  );
};
