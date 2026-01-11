import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event): Promise<Business> => {
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
  const { data: business, error } = await client
    .from("business_profiles")
    .select("*")
    .eq("owner_id", user.id)
    .single();

  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Business not found",
      message: error.message,
    });
  }
  return business;
});
