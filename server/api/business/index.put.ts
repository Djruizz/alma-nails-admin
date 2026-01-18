import { serverSupabaseClient } from "#supabase/server";
import { businessInfoFormSchema } from "@@/shared/schemas/BusinessInfoFormSchema";
export default defineEventHandler(async (event): Promise<Business> => {
  const businessId = await getBusinessId(event);
  const client = await serverSupabaseClient<Database>(event);

  const body = await readBody(event);
  if (!businessId) {
    throw createError({
      statusCode: 400,
      message: "No se proporciono un id",
      statusMessage: "Datos invalidos",
    });
  }
  const validatedData = businessInfoFormSchema.safeParse(body.data);
  if (!validatedData.success) {
    throw createError({
      statusCode: 400,
      message: validatedData.error.message,
      statusMessage: "Datos invalidos",
    });
  }
  const { data: business, error } = await client
    .from("business_profiles")
    .update(validatedData.data)
    .eq("id", businessId)
    .select()
    .single();
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al actualizar el perfil",
      message: translateSupabaseError(error.message),
    });
  }
  return business;
});
