import { serverSupabaseClient } from "#supabase/server";
import { newClientSchema } from "@@/shared/schemas/ClientSchema";
import type { Client } from "@@/shared/types/client.types";

export default defineEventHandler(async (event): Promise<Client> => {
  const businessId = await getBusinessId(event);

  const body = await readBody(event);

  const validatedData = newClientSchema.safeParse(body);
  if (!validatedData.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos invalidos",
      message: validatedData.error.message,
    });
  }

  const client = await serverSupabaseClient<Database>(event);
  const { data: newClient, error } = await client
    .from("business_clients")
    .insert({ ...validatedData.data, business_id: businessId })
    .select()
    .single();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al crear el cliente",
      message: translateSupabaseError(error.message),
    });
  }

  return newClient;
});
