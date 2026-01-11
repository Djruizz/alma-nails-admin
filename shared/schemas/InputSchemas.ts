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
