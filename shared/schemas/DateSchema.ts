import { z } from "zod";
import type { CalendarDate } from "@internationalized/date";

// Schema for validating date strings (for database)
export const bornDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida")
  .refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }, "Fecha inválida")
  .refine((val) => {
    const date = new Date(val);
    return date <= new Date();
  }, "No puedes nacer en el futuro");

// Schema for form state (accepts CalendarDate or string)
export const bornDateFormSchema = z.custom<CalendarDate | string>((val) => {
  // Accept CalendarDate objects
  if (
    val &&
    typeof val === "object" &&
    "year" in val &&
    "month" in val &&
    "day" in val
  ) {
    return true;
  }
  // Accept valid date strings
  if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
    return true;
  }
  return false;
}, "Fecha inválida");
