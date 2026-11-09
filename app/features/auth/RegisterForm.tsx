import type { FC } from "react";
import { Form, Link } from "react-router";
import { Button, Input } from "~/shared/ui";

type Props = {
  error?: string;
};

export const RegisterForm: FC<Props> = ({ error }) => {
  return (
    <Form method="post" className="space-y-4">
      <Input label="Name" id="name" name="name" required />
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
        autoComplete="new-password"
        required
      />
      <Input
        label="Confirm password"
        id="password_confirmation"
        name="password_confirmation"
        type="password"
        autoComplete="new-password"
        required
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" fullWidth>
        Create account
      </Button>
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Sign in
        </Link>
      </p>
    </Form>
  );
};
