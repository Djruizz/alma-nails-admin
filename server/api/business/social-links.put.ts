import { z } from "zod";
import { serverSupabaseClient } from "#supabase/server";
import { businessSocialSchema } from "@@/shared/schemas/BusinessSocialSchema";
import { authenticatedUser, getBusinessId } from "@@/server/utils/protectRoute";

export default defineEventHandler(async (event) => {
  const user = await authenticatedUser(event);
  const client = await serverSupabaseClient<Database>(event);

  const body = await readBody(event);
  const validatedLink = z.array(businessSocialSchema).parse(body);
  const businessId = await getBusinessId(event);
  if (!businessId) {
    throw createError({
      statusCode: 404,
      statusMessage: "Perfil no encontrado",
      message: "Perfil no encontrado",
    });
  }
  const { data: business, error } = await client
    .from("business_profiles")
    .update({
      social_links: validatedLink,
      updated_at: new Date().toISOString(),
    })
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
