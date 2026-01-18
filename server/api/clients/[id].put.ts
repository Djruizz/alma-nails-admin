import { serverSupabaseClient } from "#supabase/server";
import { clientUpdateSchema } from "@@/shared/schemas/ClientSchema";
import type { Client } from "@@/shared/types/client.types";

export default defineEventHandler(async (event): Promise<Client> => {
  const id = getRouterParams(event).id;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos invalidos",
      message: "No se proporciono un ID de cliente",
    });
  }

  const body = await readBody(event);

  // Validar los datos con Zod
  const validatedData = clientUpdateSchema.safeParse(body);
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
  const { data: updatedClient, error } = await client
    .from("business_clients")
    .update(validatedData.data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al actualizar el cliente",
      message: translateSupabaseError(error.message),
    });
  }

  return updatedClient;
});
