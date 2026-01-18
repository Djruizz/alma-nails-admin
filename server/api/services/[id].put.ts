import { serverSupabaseClient } from "#supabase/server";
import { serviceUpdateSchema } from "@@/shared/schemas/ServiceSchema";
import type { Service } from "@@/shared/types/service.types";

export default defineEventHandler(async (event): Promise<Service> => {
  const id = getRouterParams(event).id;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos invalidos",
      message: "No se proporciono un ID de servicio",
    });
  }
  const body = await readBody(event);
  // Validar los datos con Zod
  const validatedData = serviceUpdateSchema.safeParse(body);
  if (!validatedData.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos invalidos",
      message: validatedData.error.message,
    });
  }

  // Verificar que haya al menos un campo para actualizar
  if (Object.keys(validatedData.data).length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos invalidos",
      message: "No se proporcionaron campos para actualizar",
    });
  }

  const client = await serverSupabaseClient<Database>(event);
  const { data: service, error } = await client
    .from("services")
    .update(validatedData.data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al actualizar el servicio",
      message: translateSupabaseError(error.message),
    });
  }

  return service;
});
