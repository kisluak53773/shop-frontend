import { type ActionFunctionArgs } from "react-router";
import { logoutOnServer } from "../api/auth.server";
import { getToken, destroySessionAndRedirect } from "./session.server";

export async function logoutAction({ request }: ActionFunctionArgs) {
  const token = await getToken(request);
  if (token) {
    await logoutOnServer(token).catch(() => {});
  }
  return destroySessionAndRedirect(request);
}

export function logoutLoader() {
  throw new Response("Method Not Allowed", { status: 405 });
}
