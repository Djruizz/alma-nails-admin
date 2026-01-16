import { serverSupabaseClient } from "#supabase/server";
import { authenticatedUser } from "@@/server/utils/protectRoute";

export default defineEventHandler(async (event): Promise<{ ok: boolean }> => {
  await authenticatedUser(event);
  const client = await serverSupabaseClient<Database>(event);

  const query = getQuery(event);
  const serviceId = query.id as string | undefined;

  // Verificar que se proporcione un ID
  if (!serviceId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos invalidos",
      message: "No se proporciono un ID de servicio",
    });
  }

  // Eliminar el servicio
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
