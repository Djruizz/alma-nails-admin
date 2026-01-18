import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const businessId = await getBusinessId(event);

  const client = await serverSupabaseClient<Database>(event);
  const { data: appointments, error } = await client
    .from("appointments")
    .select(
      `id, start_time, end_time, status, price_at_booking, 
      service:service_id(name, duration_min), 
      client:client_id(full_name, phone), 
      professional:professional_id(profile:user_id(full_name))`
    )
    .eq("business_id", businessId);
  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Citas no encontradas",
      message: error.message,
    });
  }
  return appointments;
});
