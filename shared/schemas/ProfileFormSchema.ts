import { z } from "zod";
import { bornDateSchema } from "./Standard/DateSchema";
import { nameSchema, phoneSchema } from "./Standard/Schemas";

export const profileFormSchema = z
  .object({
    full_name: nameSchema,
    phone: phoneSchema,
    born_date: bornDateSchema,
  })
  .strict();

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;
