import {z} from "zod";

export const profileFormSchema = z.object({
    full_name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").trim(),
    //TODO: Validar que sea un telefono valido
    phone: z.string().length(10, "El teléfono debe tener exactamente 10 caracteres").trim().nullable(),
});

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;
