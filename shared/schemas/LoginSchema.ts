import { z } from "zod";
import { emailSchema } from "./Standard/Schemas";
import { passwordSchema } from "./Standard/Schemas";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;
