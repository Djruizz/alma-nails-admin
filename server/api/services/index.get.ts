import { serverSupabaseClient } from "#supabase/server";
import { authenticatedUser } from "@@/server/utils/protectRoute";
import type { Service } from "@@/shared/types/service.types";

export default defineEventHandler(async (event): Promise<Service[]> => {
  await authenticatedUser(event);
  const client = await serverSupabaseClient<Database>(event);

  const businessId = await getBusinessId(event);
  if (!businessId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos invalidos",
      message: "No se proporciono un ID de negocio",
    });
  }

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
