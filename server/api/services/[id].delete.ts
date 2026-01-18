import { serverSupabaseClient } from "#supabase/server";
import { authenticatedUser } from "@@/server/utils/protectRoute";

export default defineEventHandler(async (event): Promise<{ ok: boolean }> => {
  await authenticatedUser(event);

  const serviceId = getRouterParams(event).id;
  if (!serviceId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos invalidos",
      message: "No se proporciono un ID de servicio",
    });
  }
  const client = await serverSupabaseClient<Database>(event);

  const { error } = await client.from("services").delete().eq("id", serviceId);

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al eliminar el servicio",
      message: translateSupabaseError(error.message),
    });
  }

  return { ok: true };
});
