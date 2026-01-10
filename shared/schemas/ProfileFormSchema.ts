import { z } from "zod";
import { bornDateSchema } from "./DateSchema";

export const profileFormSchema = z
  .object({
    full_name: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(100, "El nombre es demasiado largo")
      .trim()
      .regex(
        /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
        "El nombre solo debe contener letras"
      ),

    phone: z
      .string()
      .trim()
      .regex(
        /^\d{10}$/,
        "El teléfono debe contener exactamente 10 dígitos numéricos"
      )
      .optional()
      .nullable(),
    born_date: bornDateSchema,
  })
  .strict();

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;
