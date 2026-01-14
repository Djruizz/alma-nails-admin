import { serverSupabaseClient } from "#supabase/server";
import { businessInfoFormSchema } from "@@/shared/schemas/BusinessInfoFormSchema";
import { authenticatedUser } from "@@/server/utils/protectRoute";
export default defineEventHandler(async (event): Promise<Business> => {
  const user = await authenticatedUser(event);
  const client = await serverSupabaseClient<Database>(event);

  const body = await readBody(event);
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
    .eq("owner_id", user.sub)
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
