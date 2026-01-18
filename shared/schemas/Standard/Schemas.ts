import { z } from "zod";

export const nameSchema = z
  .string()
  .min(3, "El nombre debe tener al menos 3 caracteres")
  .max(100, "El nombre es demasiado largo")
  .trim()
  .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, "El nombre solo debe contener letras");

export const emailSchema = z.email("Correo invalido");

export const phoneSchema = z
  .string()
  .trim()
  .regex(
    /^\d{10}$/,
    "El teléfono debe contener exactamente 10 dígitos numéricos"
  );

export const passwordSchema = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .max(50, "La contraseña es demasiado larga")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
    "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial"
  );

export const timeSchema = z
  .string("Hora inválida")
  .regex(/^\d{2}:\d{2}$/, "Hora inválida");
