import { type LoaderFunctionArgs } from "react-router";
import { requireToken } from "~/features/auth/model/session.server";
import { fetchCurrentUser } from "~/features/auth/api/auth.server";

export async function accountLoader({ request }: LoaderFunctionArgs) {
  const token = await requireToken(request);
  const user = await fetchCurrentUser(token);

  return { user };
}
