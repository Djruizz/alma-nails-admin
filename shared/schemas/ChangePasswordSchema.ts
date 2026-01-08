import z from "zod";

export const changePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    new_password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirm_new_password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
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
