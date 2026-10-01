import { z } from "zod";

const schema = z.object({
  SESSION_SECRET: z.string().min(32),
  API_BASE_URL: z.string().url(),
});

export const serverEnv = schema.parse({
  SESSION_SECRET: process.env.SESSION_SECRET,
  API_BASE_URL: process.env.API_BASE_URL,
});

export const isProduction = process.env.NODE_ENV === "production";
