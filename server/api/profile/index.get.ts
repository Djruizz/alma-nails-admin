import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event): Promise<Profile> => {
  const client = await serverSupabaseClient<Database>(event);
  const {
    data: { user },
    error: authError,
  } = await client.auth.getUser();

  if (!user || authError) {
    throw createError({
      statusCode: 401,
      statusMessage: "Usuario no autenticado",
      message: authError
        ? translateSupabaseError(authError.message)
        : "No se ha encontrado una sesión activa",
    });
  }

  const { data: profile, error } = await client
    .from("profiles")
    .select("*")
    .eq("id", user.id)
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
