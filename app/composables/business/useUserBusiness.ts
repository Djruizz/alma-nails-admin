export const useUserBusiness = () => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();

  /**
   * Obtiene el negocio asociado al usuario actual
   */
  const getUserBusiness = async () => {
    if (!user.value) {
      return null;
    }

    try {
      const { data: member, error } = await supabase
        .from("business_members")
        .select("business_id, role, business_profiles(*)")
        .eq("user_id", user.value.id)
        .maybeSingle();

      if (error) {
        console.error("Error al obtener el negocio del usuario:", error);
        return null;
      }

      return member;
    } catch (error) {
      console.error("Error inesperado al obtener el negocio:", error);
      return null;
    }
  };

  /**
   * Verifica si el usuario tiene un negocio
   */
  const hasBusiness = async () => {
    const business = await getUserBusiness();
    return !!business;
  };

  /**
   * Obtiene el slug del negocio del usuario
   */
  const getBusinessSlug = async () => {
    const business = await getUserBusiness();
    if (!business || !business.business_profiles) {
      return null;
    }
    // @ts-ignore - Supabase types can be complex
    return business.business_profiles.slug as string;
  };

  /**
   * Navega al dashboard del negocio del usuario
   */
  const navigateToBusinessDashboard = async () => {
    const slug = await getBusinessSlug();
    if (slug) {
      await navigateTo(`/business/${slug}/admin/dashboard`);
    } else {
      console.warn("El usuario no tiene un negocio asociado");
      await navigateTo("/");
    }
  };

  return {
    getUserBusiness,
    hasBusiness,
    getBusinessSlug,
    navigateToBusinessDashboard,
  };
};
