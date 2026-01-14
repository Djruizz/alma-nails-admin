import { z } from "zod";
import { serverSupabaseClient } from "#supabase/server";
import { businessSocialSchema } from "@@/shared/schemas/BusinessSocialSchema";
import { authenticatedUser } from "@@/server/utils/protectRoute";

export default defineEventHandler(async (event) => {
  const user = await authenticatedUser(event);
  const client = await serverSupabaseClient<Database>(event);

  const body = await readBody(event);
  const validatedLink = z.array(businessSocialSchema).parse(body);
  const { data: business, error } = await client
    .from("business_profiles")
    .update({ social_links: validatedLink })
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
