import { serverSupabaseClient } from "#supabase/server";
import { businessInfoFormSchema } from "@@/shared/schemas/BusinessInfoFormSchema";
export default defineEventHandler(async (event): Promise<Business> => {
  const body = await readBody(event);
  const client = await serverSupabaseClient<Database>(event);
  const {
    data: { user },
    error: authError,
  } = await client.auth.getUser();

  if (!user || authError) {
    throw createError({
      statusCode: 401,
      statusMessage: "Usuario no autenticado",
      message: "Usuario no autenticado",
    });
  }
  const validatedData = businessInfoFormSchema.safeParse(body);
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
    .eq("owner_id", user.id)
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
