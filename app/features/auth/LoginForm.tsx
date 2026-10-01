import type { FC } from "react";
import { Form, Link, useSearchParams } from "react-router";
import { Button, Input } from "~/shared/ui";

type Props = {
  error?: string;
};

export const LoginForm: FC<Props> = ({ error }) => {
  const [params] = useSearchParams();
  const redirectTo = params.get("redirectTo") || "/";

  return (
    <Form method="post" className="space-y-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <Input
        label="Email"
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <Input
        label="Password"
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit">Sign in</Button>
      <p className="text-center text-sm">
        No account?{" "}
        <Link to="/register" className="underline">
          Create one
        </Link>
      </p>
    </Form>
  );
};
