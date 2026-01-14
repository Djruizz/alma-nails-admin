import { serverSupabaseClient } from "#supabase/server";
import { changePasswordSchema } from "@@/shared/schemas/ChangePasswordSchema";
import { translateSupabaseError } from "@@/shared/utils/errorTranslator";
import { authenticatedUser } from "@@/server/utils/protectRoute";

export default defineEventHandler(async (event) => {
  const user = await authenticatedUser(event);

  const body = await readBody(event);
  const validatedData = changePasswordSchema.safeParse(body);
  if (!validatedData.success) {
    throw createError({
      statusCode: 400,
      message: validatedData.error.message,
      statusMessage: "Datos invalidos",
    });
  }
  const { current_password, new_password } = validatedData.data;

  const client = await serverSupabaseClient(event);

  const { error: authError } = await client.auth.signInWithPassword({
    email: user.email!,
    password: current_password,
  });

  if (authError) {
    throw createError({
      statusCode: 401,
      message: translateSupabaseError(authError.message),
      statusMessage: "Credenciales incorrectas",
    });
  }

  const { error: updateError } = await client.auth.updateUser({
    password: new_password,
  });

  if (updateError) {
    throw createError({
      statusCode: 500,
      message: translateSupabaseError(updateError.message),
      statusMessage: "Error al actualizar contraseña",
    });
  }
  return { ok: true };
});
