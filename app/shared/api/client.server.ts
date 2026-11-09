import { serverEnv } from "../lib/env.server";

export class ApiError extends Error {
  constructor(
    public status: number,
    public payload: unknown,
  ) {
    super(`API error ${status}`);
  }
}

type QueryParams = Record<string, string | number | boolean | null | undefined>;

export const withQuery = (path: string, params: QueryParams = {}) => {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  }

  const query = search.toString();
  
  return query ? `${path}?${query}` : path;
};

type ApiOptions =Omit<RequestInit, "body"> & {
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
