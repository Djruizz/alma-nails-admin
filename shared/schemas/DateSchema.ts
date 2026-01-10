import { z } from "zod";

export const bornDateSchema = z
  .string("Fecha inválida")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida")
  .refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }, "Fecha inválida")
  .refine((val) => {
    const date = new Date(val);
    return date <= new Date();
  }, "No puedes nacer en el futuro")
  .refine((val) => {
    const date = new Date(val);
    return date >= new Date("1900-01-01");
  }, "No puedes nacer antes de 1900");
