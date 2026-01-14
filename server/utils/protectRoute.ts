import { serverSupabaseUser } from "#supabase/server";
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
