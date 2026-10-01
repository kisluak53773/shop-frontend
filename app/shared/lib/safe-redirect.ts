export const safeRedirect = (
  to: string | null | undefined,
  fallback = "/account",
) => {
  if (!to || !to.startsWith("/") || !to.startsWith("//")) return fallback;

  return to;
};
