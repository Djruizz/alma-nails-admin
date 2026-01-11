import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(
  async (event): Promise<BusinessSocialBase> => {
    const client = await serverSupabaseClient<Database>(event);
    const {
      data: { user },
      error: authError,
    } = await client.auth.getUser();
    if (!user || authError) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: authError?.message,
      });
    }
    const body = await readBody(event);
    const { data: business, error: businessError } = await client
      .from("business_profiles")
      .select("id")
      .eq("owner_id", user.id)
      .single();
    if (businessError) {
      throw createError({
        statusCode: 404,
        statusMessage: "Business not found",
        message: businessError.message,
      });
    }
    const payload = {
      business_id: business.id,
      social_network_id: body.social_network_id,
      url: body.url,
      custom_name: body.custom_name || null,
      custom_icon: body.custom_icon || null,
    };
    const { data: businessSocial, error } = await client
      .from("business_socials")
      .insert(payload)
      .select()
      .single();
    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error al crear la red social",
        message: translateSupabaseError(error.message),
      });
    }
    return businessSocial;
  }
);
