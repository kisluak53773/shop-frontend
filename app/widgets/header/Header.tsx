import type { FC } from "react";
import { Form, Link } from "react-router";
import { Button } from "~/shared/ui";
import { useAuth } from "~/features/auth";

export const Header: FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
        <Link to="/" className="text-lg font-semibold">
          MyApp
        </Link>

        <nav className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/account"
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
              >
                Account
              </Link>
              <Form method="post" action="/logout">
                <Button type="submit">Logout</Button>
              </Form>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-black px-3 py-1.5 text-sm text-white hover:bg-gray-800"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
