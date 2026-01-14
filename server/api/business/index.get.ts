import { serverSupabaseClient } from "#supabase/server";
import { authenticatedUser } from "@@/server/utils/protectRoute";

export default defineEventHandler(async (event): Promise<Business> => {
  const user = await authenticatedUser(event);
  const client = await serverSupabaseClient<Database>(event);

  console.log("cookies:", getRequestHeader(event, "cookie"));
  console.log("auth:", getRequestHeader(event, "authorization"));

  const { data: business, error } = await client
    .from("business_profiles")
    .select("*")
    .eq("owner_id", user.sub)
    .single();

  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Perfil no encontrado",
      message: error.message,
    });
  }
  return business;
});
