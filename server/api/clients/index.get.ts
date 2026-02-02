import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(
  async (event): Promise<ClientWithProfile[]> => {
    const businessId = await getBusinessId(event);

    // Get search query parameter
    const query = getQuery(event);
    const searchTerm = query.search as string | undefined;
    const sort_by = query.sort as string | undefined;
    const sort_order = query.direction as string | undefined;
    const isActive = query.isActive as boolean | undefined;

    const client = await serverSupabaseClient<Database>(event);

    let queryBuilder = client
      .from("business_clients_with_profiles")
      .select("*")
      .eq("business_id", businessId);
    if (sort_by) {
      queryBuilder = queryBuilder.order(sort_by, {
        ascending: sort_order === "asc",
      });
    }
    if (isActive) {
      queryBuilder = queryBuilder.eq("is_active", isActive);
    }

    if (searchTerm) {
      queryBuilder = queryBuilder.or(
        `display_full_name.ilike.%${searchTerm}%,notes.ilike.%${searchTerm}%,display_phone.ilike.%${searchTerm}%`,
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
  },
);
