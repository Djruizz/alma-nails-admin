import { serverSupabaseClient } from "#supabase/server";
import { authenticatedUser } from "@@/server/utils/protectRoute";

export default defineEventHandler(async (event): Promise<Profile> => {
  const user = await authenticatedUser(event);
  const client = await serverSupabaseClient<Database>(event);

  const { data: profile, error } = await client
    .from("profiles")
    .select("*")
    .eq("id", user.sub)
    .single();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al obtener el perfil",
      message: translateSupabaseError(error.message),
    });
  }

  return profile;
});
