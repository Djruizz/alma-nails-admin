import {z} from "zod";

export const profileFormSchema = z.object({
    full_name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").nullable(),
    email: z.email("El correo electrónico debe ser válido").nullable(),
    phone: z.string().min(10, "El teléfono debe tener al menos 10 caracteres").nullable(),
});

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;
