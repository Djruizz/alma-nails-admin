import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const businessId = await getBusinessId(event);

  const id = getRouterParams(event).id;
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "No se proporciono un ID",
      message: "No se proporciono un ID de plantilla de horario",
    });
  }
  const client = await serverSupabaseClient<Database>(event);
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
