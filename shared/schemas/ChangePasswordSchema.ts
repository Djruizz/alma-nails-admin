import z from "zod";
import { passwordSchema } from "./Standard/Schemas";

export const changePasswordSchema = z
  .object({
    current_password: passwordSchema,
    new_password: passwordSchema,
    confirm_new_password: passwordSchema,
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Las contraseñas no coinciden",
    path: ["confirm_new_password"],
  })
  .refine((data) => data.new_password !== data.current_password, {
    message: "La contraseña nueva no puede ser igual a la actual",
    path: ["new_password"],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
