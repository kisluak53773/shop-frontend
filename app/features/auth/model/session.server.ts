import { createCookieSessionStorage, redirect } from "react-router";
import { serverEnv, isProduction } from "~/shared/lib/env.server";

const storage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    secure: isProduction,
    secrets: [serverEnv.SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
});

export const getToken = async (request: Request) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return session.get("token") ?? null;
};

export const requireToken = async (request: Request) => {
  const token = await getToken(request);

  if (!token) {
    const url = new URL(request.url);
    throw redirect(`/login?redirect=${url.pathname}`);
  }

  return token;
};

export const createSessionAndRedirect = async (
  token: string,
  redirectTo: string,
) => {
  const session = await storage.getSession();
  session.set("token", token);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};

export const destroySessionAndRedirect = async (
  request: Request,
  to = "/login",
) => {
  const session = await storage.getSession(request.headers.get("Cookie"));

  return redirect(to, {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
};
