import { serverSupabaseClient } from "#supabase/server";
import { profileFormSchema } from "@@/shared/schemas/ProfileFormSchema";
import { authenticatedUser } from "@@/server/utils/protectRoute";
export default defineEventHandler(async (event): Promise<Profile> => {
  const user = await authenticatedUser(event);
  const client = await serverSupabaseClient<Database>(event);

  const body = await readBody(event);
  const validatedData = profileFormSchema.safeParse(body);
  if (!validatedData.success) {
    throw createError({
      statusCode: 400,
      message: validatedData.error.message,
      statusMessage: "Datos invalidos",
    });
  }
  const { data: profile, error } = await client
    .from("profiles")
    .update(validatedData.data)
    .eq("id", user.sub)
    .select()
    .single();
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al actualizar el perfil",
      message: translateSupabaseError(error.message),
    });
  }
  return profile;
});
