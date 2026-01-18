import { serverSupabaseClient } from "#supabase/server";
import type { Service } from "@@/shared/types/service.types";

export default defineEventHandler(async (event): Promise<Service[]> => {
  const businessId = await getBusinessId(event);

  const client = await serverSupabaseClient<Database>(event);

  const { data: services, error } = await client
    .from("services")
    .select("*")
    .eq("business_id", businessId)
    .order("id", {
      ascending: false,
    });

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al obtener los servicios",
      message: translateSupabaseError(error.message),
    });
  }

  return services || [];
});
