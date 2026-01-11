import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event): Promise<BusinessSocial[]> => {
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
  const { data: business } = await client
    .from("business_profiles")
    .select("id")
    .eq("owner_id", user.id)
    .single();
  if (!business) {
    throw createError({
      statusCode: 404,
      statusMessage: "Perfil no encontrado",
      message: "Perfil no encontrado",
    });
  }
  const { data: businessSocials, error } = await client
    .from("business_socials")
    .select("*, social_networks (name, icon, brand_color)")
    .eq("business_id", business.id);
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al obtener el perfil",
      message: translateSupabaseError(error.message),
    });
  }
  return businessSocials;
});
