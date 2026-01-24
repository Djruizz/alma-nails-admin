import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Slug is required",
    });
  }

  const client = await serverSupabaseClient<Database>(event);

  const { data, error } = await client
    .from("business_profiles")
    .select("name, slug, id")
    .eq("slug", slug)
    .single();

  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Business not found",
      message: error.message,
    });
  }

  return data;
});
