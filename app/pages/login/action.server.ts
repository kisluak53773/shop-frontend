import type { ActionFunctionArgs } from "react-router";
import { loginOnServer } from "~/features/auth/api/auth.server";
import { createSessionAndRedirect } from "~/features/auth/model/session.server";
import { ApiError } from "~/shared/api/client.server";
import { safeRedirect } from "~/shared/lib/safe-redirect";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const payload = {
    email: String(form.get("email") ?? "").trim(),
    password: String(form.get("password") ?? ""),
  };
  const redirectTo = safeRedirect(String(form.get("redirectTo") ?? "/account"));

  if (!payload.email || !payload.password) {
    return { error: "Email and password are required" };
  }

  try {
    const { token } = await loginOnServer(payload);
    return createSessionAndRedirect(token, redirectTo);
  } catch (err) {
    if (err instanceof ApiError && (err.status === 401 || err.status === 422)) {
      return { error: "Invalid credentials" };
    }
    return { error: "Something went wrong. Please try again." };
  }
};
