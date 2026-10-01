export const clientEnv = {
  VITE_QUERY_STALE_TIME: Number(import.meta.env.VITE_QUERY_STALE_TIME ?? 30_000),
} as const;

export const isDevelopment = import.meta.env.DEV;