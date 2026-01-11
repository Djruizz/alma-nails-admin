import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const {
    data: { user },
    error: authError,
  } = await client.auth.getUser();
  if (!user || authError) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: authError?.message,
    });
  }
  const body = await readBody(event);
  const { data: business, error: businessError } = await client
    .from("business_profiles")
    .select("id")
    .eq("owner_id", user.id)
    .single();
  if (businessError) {
    throw createError({
      statusCode: 404,
      statusMessage: "Business not found",
      message: businessError.message,
    });
  }
  const payload = {
    id: body.id,
    url: body.url,
  };
  const { data: businessSocial, error } = await client
    .from("business_socials")
    .update(payload)
    .eq("id", payload.id)
    .eq("business_id", business.id)
    .select()
    .single();
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al actualizar la red social",
      message: translateSupabaseError(error.message),
    });
  }
  return businessSocial;
});
