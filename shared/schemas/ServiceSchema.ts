import { z } from "zod";

export const serviceSchema = z
  .object({
    name: z.string().min(1, "El nombre es requerido"),
    price: z.number().positive("El precio debe ser mayor a 0"),
    duration_min: z.number().int().positive("La duracion debe ser mayor a 0"),
    is_active: z.boolean().optional().default(true),
  })
  .strict();

export const serviceUpdateSchema = z
  .object({
    name: z.string().min(1, "El nombre es requerido").optional(),
    price: z.number().positive("El precio debe ser mayor a 0").optional(),
    duration_min: z
      .number()
      .int()
      .positive("La duracion debe ser mayor a 0")
      .optional(),
    is_active: z.boolean().optional(),
  })
  .strict();

export type ServiceSchema = z.infer<typeof serviceSchema>;
export type ServiceUpdateSchema = z.infer<typeof serviceUpdateSchema>;
