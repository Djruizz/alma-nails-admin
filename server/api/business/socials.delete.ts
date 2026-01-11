import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event): Promise<void> => {
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
  const { error } = await client
    .from("business_socials")
    .delete()
    .eq("id", body.id)
    .eq("business_id", business.id);
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al eliminar la red social",
      message: translateSupabaseError(error.message),
    });
  }
});
