import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event): Promise<SocialNetwork[]> => {
  const client = await serverSupabaseClient<Database>(event);
  const { data: networks, error } = await client
    .from("social_networks")
    .select("*")
    .eq("is_active", true);
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al obtener las redes sociales",
      message: translateSupabaseError(error.message),
    });
  }
  return networks;
});
