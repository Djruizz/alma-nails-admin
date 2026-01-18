import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const businessId = await getBusinessId(event);
  const client = await serverSupabaseClient<Database>(event);

  const id = getRouterParams(event).id;
  const { error } = await client
    .from("time_slot_templates")
    .delete()
    .eq("id", id)
    .eq("business_id", businessId);
  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Error al eliminar la plantilla de horario",
      message: error.message,
    });
  }
  return { ok: true };
});
