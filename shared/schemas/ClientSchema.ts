import { z } from "zod";
import { phoneSchema, nameSchema } from "./Standard/Schemas";
export const newClientSchema = z
  .object({
    internal_name: nameSchema,
    internal_phone: phoneSchema,
    notes: z.string().optional().nullable(),
    is_active: z.boolean().default(true),
  })
  .strict();

export const clientUpdateSchema = z
  .object({
    notes: z.string().trim().optional(),
    is_active: z.boolean().optional(),
  })
  .strict();

export type NewClientSchema = z.infer<typeof newClientSchema>;
export type ClientUpdateSchema = z.infer<typeof clientUpdateSchema>;
