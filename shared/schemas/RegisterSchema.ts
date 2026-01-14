import { z } from "zod";
import { bornDateSchema } from "./Standard/DateSchema";
import {
  nameSchema,
  phoneSchema,
  emailSchema,
  passwordSchema,
} from "./Standard/Schemas";

export const registerSchema = z.object({
  full_name: nameSchema,
  phone: phoneSchema,
  born_date: bornDateSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterSchema = z.infer<typeof registerSchema>;
