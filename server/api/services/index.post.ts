import { serverSupabaseClient } from "#supabase/server";
import { authenticatedUser } from "@@/server/utils/protectRoute";
import { serviceSchema } from "@@/shared/schemas/ServiceSchema";
import type { Service } from "@@/shared/types/service.types";

export default defineEventHandler(async (event): Promise<Service> => {
  await authenticatedUser(event);
  const client = await serverSupabaseClient<Database>(event);

  const body = await readBody(event);
  const businessId = await getBusinessId(event);
  if (!businessId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos invalidos",
      message: "No se proporciono un ID de negocio",
    });
  }
  // Validar los datos con Zod
  const validatedData = serviceSchema.safeParse(body);
  if (!validatedData.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos invalidos",
      message: validatedData.error.message,
    });
  }

  // Crear el servicio
  const { data: service, error } = await client
    .from("services")
    .insert({ ...validatedData.data, business_id: businessId })
    .select()
    .single();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al crear el servicio",
      message: translateSupabaseError(error.message),
    });
  }

  return service;
});
