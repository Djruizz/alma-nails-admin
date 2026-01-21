import { serverSupabaseClient } from "#supabase/server";
import type { ClientResponse } from "@@/shared/types/client.types";

export default defineEventHandler(async (event): Promise<ClientResponse[]> => {
  const businessId = await getBusinessId(event);

  // Get search query parameter
  const query = getQuery(event);
  const searchTerm = query.search as string | undefined;

  const client = await serverSupabaseClient<Database>(event);

  let queryBuilder = client
    .from("business_clients_with_profiles") // Consultas la vista
    .select(
      `id, full_name, phone, notes, created_at, is_active, born_date, email`
    )
    .eq("business_id", businessId);

  if (searchTerm) {
    queryBuilder = queryBuilder.or(
      `full_name.ilike.%${searchTerm}%,notes.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%`
    );
  }

  const { data: clients, error } = await queryBuilder;

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al obtener los clientes",
      message: translateSupabaseError(error.message),
    });
  }
  return clients;
});
