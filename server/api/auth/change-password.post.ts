import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  //Validar con zod

  const { current_password, new_password } = body; //Should be zod validation
  const user = await serverSupabaseUser(event);
  if (!user?.email) {
    throw createError({
      statusCode: 401,
      message: "Usuario no encontrado",
      statusMessage: "Usuario no encontrado",
    });
  }

  const client = await serverSupabaseClient(event);

  const { error: authError } = await client.auth.signInWithPassword({
    email: user.email,
    password: current_password,
  });

  if (authError) {
    throw createError({
      statusCode: 401,
      message: "Contraseña actual incorrecta",
      statusMessage: "Contraseña actual incorrecta",
    });
  }

  const { error: updateError } = await client.auth.updateUser({
    password: new_password,
  });

  if (updateError) {
    throw createError({
      statusCode: 401,
      message: "Error al actualizar la contraseña",
      statusMessage: "Error al actualizar la contraseña",
    });
  }
  return { ok: true };
});
