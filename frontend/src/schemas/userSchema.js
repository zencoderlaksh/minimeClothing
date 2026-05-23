// schema.js

import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  remember: z.boolean(),
});