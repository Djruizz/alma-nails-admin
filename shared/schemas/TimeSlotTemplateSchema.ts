import { z } from "zod";
import { timeSchema } from "./Standard/Schemas";
export const timeSlotTemplateSchema = z.object({
  day_of_week: z
    .int("Debe ser un numero")
    .min(0, "Dia de la semana invalido")
    .max(6, "Dia de la semana invalido"),
  start_time: timeSchema,
});
export type TimeSlotTemplate = z.infer<typeof timeSlotTemplateSchema>;

export const updateTimeSlotTemplateSchema = z.object({
  day_of_week: z
    .int("Debe ser un numero")
    .min(0, "Dia de la semana invalido")
    .max(6, "Dia de la semana invalido")
    .optional(),
  start_time: timeSchema.optional(),
});
export type UpdateTimeSlotTemplate = z.infer<
  typeof updateTimeSlotTemplateSchema
>;
