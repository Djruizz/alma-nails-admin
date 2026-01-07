import z from "zod";

export const securityFormSchema = z
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
  });

export type SecurityFormSchema = z.infer<typeof securityFormSchema>;
