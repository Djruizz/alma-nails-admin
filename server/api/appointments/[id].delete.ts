import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const user = await authenticatedUser(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Usuario no autenticado",
      message: "Usuario no autenticado",
    });
  }
  const id = getRouterParam(event, "id") as string;
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos invalidos",
      message: "No se proporciono un ID de cita",
    });
  }
  const businessId = await getBusinessId(event);
  const client = await serverSupabaseClient<Database>(event);
  const { error } = await client
    .from("appointments")
    .delete()
    .eq("id", id)
    .eq("business_id", businessId);
  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Citas no encontradas",
      message: error.message,
    });
  }
  return { ok: true };
});
