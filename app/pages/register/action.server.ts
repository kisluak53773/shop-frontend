import type { ActionFunctionArgs } from "react-router";
import { registerOnServer } from "~/features/auth/api/auth.server";
import { createSessionAndRedirect } from "~/features/auth/model/session.server";
import { ApiError } from "~/shared/api/client.server";

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const payload = {
    name: String(form.get("name") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    password: String(form.get("password") ?? ""),
  };
  const passwordConfirmation = String(form.get("password_confirmation") ?? "");

  if (!payload.name || !payload.email || !payload.password) {
    return { error: "All fields are required" };
  }

  if (payload.password !== passwordConfirmation) {
    return { error: "Passwords do not match" };
  }

  try {
    const { token } = await registerOnServer(payload);

    return createSessionAndRedirect(token, "/account");
  } catch (err) {
    if (err instanceof ApiError && err.status === 422) {
      const payload = err.payload as {
        errors?: Record<string, string[]>;
      } | null;
      const message = payload?.errors
        ? Object.values(payload.errors).flat()[0]
        : "Registration failed";
      return { error: message };
    }

    return { error: "Something went wrong. Please try again." };
  }
};
