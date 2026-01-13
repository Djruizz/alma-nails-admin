import { serverSupabaseClient } from "#supabase/server";
import { businessSocialSchema } from "@@/shared/schemas/BusinessSocialSchema";
import { z } from "zod";
export default defineEventHandler(async (event) => {
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
  const validatedLink = z.array(businessSocialSchema).parse(body);
  const { data: business, error } = await client
    .from("business_profiles")
    .update({ social_links: validatedLink })
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
