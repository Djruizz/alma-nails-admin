import { z } from "zod";
import { bornDateSchema } from "./DateSchema";
export const registerSchema = z.object({
  full_name: z.string("Nombre inválido").min(3, "3 caracteres como mínimo"),
  phone: z.string("Telefono inválido").min(8, "8 caracteres como mínimo"),
  born_date: bornDateSchema,
  email: z.email("Email inválido"),
  password: z.string("Contraseña inválida").min(8, "8 caracteres como mínimo"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
