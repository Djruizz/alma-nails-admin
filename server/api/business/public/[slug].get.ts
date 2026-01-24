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

  /*
   * Use maybeSingle() to avoid "JSON object requested, multiple (or no) rows returned" error
   * when the slug doesn't exist.
   */
  const { data, error } = await client
    .from("business_profiles")
    .select("name, slug, id")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Database error",
      message: error.message,
    });
  }

  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: "Business not found",
    });
  }

  return data;
});
