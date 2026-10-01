import { apiFetch } from "~/shared/api/client.server";
import type { User } from "~/entities/user";
import type { RegisterPayload, LoginPayload } from "./types";

type AuthResponse = {
  user: User;
  token: string;
};

export const loginOnServer = async ({ email, password }: LoginPayload) => {
  return apiFetch<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
};

export const registerOnServer = async ({
  name,
  email,
  password,
}: RegisterPayload) => {
  return apiFetch<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: { name, email, password },
  });
};

export async function fetchCurrentUser(token: string) {
  return apiFetch<User>("/api/auth/me", { method: "GET", token });
}

export async function logoutOnServer(token: string) {
  return apiFetch<void>("/api/auth/logout", { method: "POST", token });
}
