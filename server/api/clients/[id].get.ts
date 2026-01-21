import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const businessId = await getBusinessId(event);
  const id = getRouterParams(event).id as string;
  const client = await serverSupabaseClient<Database>(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "No se proporciono un id",
      message: "No se proporciono un id",
    });
  }
  const { data: clientData, error } = await client
    .from("business_clients_with_profiles")
    .select("*")
    .eq("id", id)
    .eq("business_id", businessId)
    .single();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al obtener el cliente",
      message: translateSupabaseError(error.message),
    });
  }

  return clientData;
});
