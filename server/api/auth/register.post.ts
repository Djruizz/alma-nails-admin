import { serverSupabaseClient } from "#supabase/server";
import { registerSchema } from "@@/shared/schemas/RegisterSchema";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validatedData = registerSchema.safeParse(body);
  if (!validatedData.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos invalidos",
      message: validatedData.error.message,
    });
  }
  const client = await serverSupabaseClient(event);
  const { error: authError } = await client.auth.signUp({
    email: validatedData.data.email,
    password: validatedData.data.password,
    options: {
      data: {
        full_name: validatedData.data.full_name,
        phone: validatedData.data.phone,
        born_date: validatedData.data.born_date,
        email: validatedData.data.email,
      },
    },
  });
  if (authError) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al registrar",
      message: authError.message,
    });
  }
  const { error: loginError } = await client.auth.signInWithPassword({
    email: validatedData.data.email,
    password: validatedData.data.password,
  });
  if (loginError) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al iniciar sesión",
      message: loginError.message,
    });
  }
  return { ok: true };
});
