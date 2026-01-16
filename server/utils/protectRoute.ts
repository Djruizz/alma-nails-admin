import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";
export const authenticatedUser = async (event: any) => {
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Usuario no autenticado",
      message: "Usuario no autenticado",
    });
  }
  return user;
};
export const getBusinessId = async (event: any) => {
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Usuario no autenticado",
      message: "Usuario no autenticado",
    });
  }
  const client = await serverSupabaseClient<Database>(event);
  const { data: member, error } = await client
    .from("business_members")
    .select("business_id")
    .eq("user_id", user.sub)
    .maybeSingle();
  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Perfil no encontrado",
      message: error.message,
    });
  }
  if (!member?.business_id) {
    throw createError({
      statusCode: 404,
      statusMessage: "Perfil no encontrado",
      message: "Perfil no encontrado",
    });
  }
  return member.business_id;
};
