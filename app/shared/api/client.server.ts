import { serverEnv } from "../lib/env.server";

export class ApiError extends Error {
  constructor(
    public status: number,
    public payload: unknown,
  ) {
    super(`API error ${status}`);
  }
}

type ApiOptions = Omit<RequestInit, "body"> & {
  token?: string;
  body?: unknown;
};

export const apiFetch = async <T>(
  path: string,
  { token, body, headers, ...init }: ApiOptions = {},
) => {
  const res = await fetch(`${serverEnv.API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = res.status === 204 ? null : await res.json();

  if (!res.ok) throw new ApiError(res.status, payload);

  return payload as T;
};
