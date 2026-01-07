import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import type { Profile } from "@/types/profile.types";

export default defineEventHandler(async (event): Promise<Profile | null> => {
  const client = await serverSupabaseClient<Database>(event);
  const {
    data: { user },
    error: authError,
  } = await client.auth.getUser();

  if (!user || authError) {
    throw createError({
      statusCode: 500,
      statusMessage: "Usuario no encontrado",
      message: "Usuario no encontrado",
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
      message: error.message,
    });
  }
  if (!profile) return null;

  return profile;
});
