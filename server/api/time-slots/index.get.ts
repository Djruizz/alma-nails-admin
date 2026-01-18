import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const businessId = await getBusinessId(event);
  const client = await serverSupabaseClient<Database>(event);
  const { data: timeSlots, error } = await client
    .from("time_slot_templates")
    .select(`id, day_of_week, start_time`)
    .eq("business_id", businessId);
  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Plantillas de horarios no encontradas",
      message: error.message,
    });
  }
  return timeSlots;
});
