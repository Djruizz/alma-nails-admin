import { z } from "zod";

export const clientSchema = z
  .object({
    full_name: z.string().min(1, "El nombre completo es requerido"),
    phone: z
      .string()
      .min(10, "El teléfono debe tener al menos 10 dígitos")
      .regex(
        /^[0-9+\-\s()]*$/,
        "El teléfono solo puede contener números y símbolos válidos"
      ),
    notes: z.string().optional().nullable(),
    user_id: z.uuid("El ID de usuario debe ser válido"),
  })
  .strict();

export const clientUpdateSchema = z
  .object({
    notes: z.string().trim().optional(),
    is_active: z.boolean().optional(),
  })
  .strict();

export type ClientSchema = z.infer<typeof clientSchema>;
export type ClientUpdateSchema = z.infer<typeof clientUpdateSchema>;
