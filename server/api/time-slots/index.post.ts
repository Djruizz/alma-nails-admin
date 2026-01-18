import { serverSupabaseClient } from "#supabase/server";
import { timeSlotTemplateSchema } from "@@/shared/schemas/TimeSlotTemplateSchema";

export default defineEventHandler(async (event) => {
  const businessId = await getBusinessId(event);

  const body = await readBody(event);
  const validatedData = timeSlotTemplateSchema.safeParse(body);

  if (!validatedData.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos inválidos",
      message: validatedData.error.message,
    });
  }

  const client = await serverSupabaseClient<Database>(event);
  const { data: timeSlot, error } = await client
    .from("time_slot_templates")
    .insert({ ...validatedData.data, business_id: businessId, is_active: true })
    .select()
    .single();
  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Error al crear la plantilla de horario",
      message: error.message,
    });
  }
  return timeSlot;
});
