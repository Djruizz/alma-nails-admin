import { z } from "zod";
import { nameSchema, phoneSchema, emailSchema } from "./InputSchemas";

export const businessInfoFormSchema = z
  .object({
    name: nameSchema,
    phone: phoneSchema,
    description: z.string().min(1, "La descripcion es requerida"),
    email: emailSchema,
    address: z.string().min(1, "La direccion es requerida"),
  })
  .strict();

export type BusinessInfoFormSchema = z.infer<typeof businessInfoFormSchema>;
