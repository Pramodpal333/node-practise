import { email, z } from "zod";

export const signUpPostRequestBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginPostRequestBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const urlShortenPostRequestBodySchema = z.object({
  url: z.string().url(),
});
