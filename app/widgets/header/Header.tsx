import type { FC } from "react";
import { Form, Link } from "react-router";
import { AccountIcon, Button, buttonVariants, SearchIcon } from "~/shared/ui";
import { useAuth } from "~/features/auth";

export const Header: FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex h-22.5 max-w-300 items-center gap-6 px-4">
        <Link to="/" className="text-2xl font-bold text-primary">
          MyApp
        </Link>

        <form
          role="search"
          action="/"
          className="mx-auto hidden h-12 w-full max-w-126.75 items-center gap-2.5 rounded-[0.625rem] bg-surface-tint px-4 text-body focus-within:outline-2 focus-within:outline-primary md:flex"
        >
          <SearchIcon className="size-4.5 shrink-0" />
          <input
            type="search"
            name="q"
            aria-label="Search"
            placeholder="Search books, authors and more..."
            className="w-full bg-transparent text-sm leading-4.5 text-heading outline-none placeholder:text-body"
          />
        </form>

        <nav className="ml-auto flex items-center gap-5 md:ml-0">
          {isAuthenticated ? (
            <>
              <Link
                to="/account"
                className={buttonVariants({ variant: "ghost", size: "none" })}
              >
                <AccountIcon className="size-6" />
                <span className="text-base leading-4.5 font-bold">Account</span>
              </Link>
              <Form method="post" action="/logout">
                <Button type="submit" variant="outline" size="sm" pill>
                  Logout
                </Button>
              </Form>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={buttonVariants({ variant: "ghost", size: "none" })}
              >
                <AccountIcon className="size-6" />
                <span className="text-base leading-4.5 font-bold">Sign In</span>
              </Link>
              <Link
                to="/register"
                className={buttonVariants({
                  variant: "primary",
                  size: "sm",
                  pill: true,
                })}
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
