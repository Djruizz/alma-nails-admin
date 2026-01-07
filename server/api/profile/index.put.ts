import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import type { Profile, ProfileUpdate } from "@/types/profile.types";

export default defineEventHandler(async (event): Promise<Profile> => {
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
  // Validar que el body tenga los campos permitidos (Idealmente con zod )
  const payload: ProfileUpdate = {
    full_name: body.full_name,
    phone: body.phone,
  };
  const { data: profile, error } = await client
    .from("profiles")
    .update(payload)
    .eq("id", user.id)
    .select()
    .single();
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al actualizar el perfil",
      message: error.message,
    });
  }
  return profile;
});
