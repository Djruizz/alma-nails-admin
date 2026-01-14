import { serverSupabaseClient } from "#supabase/server";
import { authenticatedUser } from "@@/server/utils/protectRoute";
import { serviceUpdateSchema } from "@@/shared/schemas/ServiceSchema";
import type { Service } from "@@/shared/types/service.types";

export default defineEventHandler(async (event): Promise<Service> => {
  await authenticatedUser(event);
  const client = await serverSupabaseClient<Database>(event);

  const body = await readBody(event);

  // Verificar que se proporcione un ID
  if (!body.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos invalidos",
      message: "No se proporciono un ID de servicio",
    });
  }

  // Validar los datos con Zod
  const validatedData = serviceUpdateSchema.safeParse(body.data);
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

  // Actualizar el servicio
  const { data: service, error } = await client
    .from("services")
    .update(validatedData.data)
    .eq("id", body.id)
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
