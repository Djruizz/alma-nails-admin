import { serverSupabaseClient } from "#supabase/server";
import { getBusinessId } from "@@/server/utils/protectRoute";

export default defineEventHandler(async (event): Promise<{ ok: boolean }> => {
  const businessId = await getBusinessId(event);

  const clientId = getRouterParams(event).id;
  if (!clientId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos invalidos",
      message: "No se proporciono un ID de cliente",
    });
  }

  const client = await serverSupabaseClient<Database>(event);

  const { error } = await client
    .from("business_clients")
    .delete()
    .eq("id", clientId)
    .eq("business_id", businessId);

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al eliminar el cliente",
      message: translateSupabaseError(error.message),
    });
  }

  return { ok: true };
});
