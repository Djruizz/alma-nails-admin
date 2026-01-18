import { serverSupabaseClient } from "#supabase/server";
import { updateTimeSlotTemplateSchema } from "@@/shared/schemas/TimeSlotTemplateSchema";

export default defineEventHandler(async (event) => {
  const businessId = await getBusinessId(event);
  const client = await serverSupabaseClient<Database>(event);

  const body = await readBody(event);
  const id = getRouterParams(event).id;
  const validatedData = updateTimeSlotTemplateSchema.safeParse(body);

  if (!validatedData.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos inválidos",
      message: validatedData.error.message,
    });
  }
  if (Object.keys(validatedData.data).length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "No se proporcionaron campos para actualizar",
      message: "No se proporcionaron campos para actualizar",
    });
  }
  const { data: timeSlot, error } = await client
    .from("time_slot_templates")
    .update(validatedData.data)
    .eq("id", id)
    .eq("business_id", businessId)
    .select()
    .single();

  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Error al actualizar la plantilla de horario",
      message: error.message,
    });
  }
  return timeSlot;
});
