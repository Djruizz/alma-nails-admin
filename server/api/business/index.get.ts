import { serverSupabaseClient } from "#supabase/server";
import { authenticatedUser } from "@@/server/utils/protectRoute";

export default defineEventHandler(async (event) => {
  const user = await authenticatedUser(event);
  const client = await serverSupabaseClient<Database>(event);

  const { data: member, error } = await client
    .from("business_members")
    .select("role, business_profiles(*)")
    .eq("user_id", user.sub)
    .maybeSingle();

  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Perfil no encontrado",
      message: error.message,
    });
  }
  if (!member) {
    return { hasBusiness: false, business: null, role: null };
  }
  return {
    role: member.role,
    business: member.business_profiles,
    hasBusiness: true,
  };
});
