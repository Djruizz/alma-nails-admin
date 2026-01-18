import { serverSupabaseClient } from "#supabase/server";
import { serviceSchema } from "@@/shared/schemas/ServiceSchema";
import type { Service } from "@@/shared/types/service.types";

export default defineEventHandler(async (event): Promise<Service> => {
  const businessId = await getBusinessId(event);

  const body = await readBody(event);

  const validatedData = serviceSchema.safeParse(body);
  if (!validatedData.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos invalidos",
      message: validatedData.error.message,
    });
  }

  const client = await serverSupabaseClient<Database>(event);
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
