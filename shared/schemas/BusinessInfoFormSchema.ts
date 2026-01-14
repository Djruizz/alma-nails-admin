import { z } from "zod";
import { nameSchema, phoneSchema, emailSchema } from "./Standard/Schemas";

export const businessInfoFormSchema = z
  .object({
    name: nameSchema,
    phone: phoneSchema.optional(),
    description: z.string().min(1, "La descripcion es requerida").optional(),
    email: emailSchema.optional(),
    address: z.string().min(1, "La direccion es requerida").optional(),
  })
  .strict();

export type BusinessInfoFormSchema = z.infer<typeof businessInfoFormSchema>;
