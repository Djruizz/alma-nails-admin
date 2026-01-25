export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const userId = useState<string | null>("userId", () => null);
  const businessCredentials = useState<{
    id: string;
    slug: string;
  } | null>("businessCredentials", () => null);
  const memberData = useState<any | null>("member", () => null);

  // Only apply strict permissions check for admin routes
  if (!to.path.includes("/admin")) {
    return;
  }

  if (!user.value) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return navigateTo({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  }

  const routeSlug = to.params.slug as string;
  const siteIndex = `/business/${routeSlug}/site`;
  // Retrieve existing business data check if matches current route
  if (
    !businessCredentials.value?.id ||
    businessCredentials.value?.slug !== routeSlug
  ) {
    const { data: business, error: businessError } = await supabase
      .from("business_profiles")
      .select("id, slug")
      .eq("slug", routeSlug)
      .maybeSingle();

    // Redirect to /index if there is no existing business
    if (businessError || !business) {
      console.error("Error al obtener el negocio:");
      return navigateTo(`/`);
    }

    businessCredentials.value = {
      id: business.id,
      slug: business.slug,
    };
    // Reset member data as we changed business
    memberData.value = null;
  }

  // Obtener el ID del usuario actual
  userId.value = user.value?.id || user.value?.sub;

  if (!userId.value) {
    return navigateTo({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }

  // Verificar si el usuario es miembro del negocio
  if (!memberData.value) {
    const { data: member, error: memberError } = await supabase
      .from("business_members")
      .select("role, business_id")
      .eq("user_id", userId.value)
      .eq("business_id", businessCredentials.value?.id)
      .maybeSingle();

    // Redirect to the site/index page if there is not permission
    if (memberError || !member) {
      console.error("Error al obtener el miembro:", memberError);
      return navigateTo(siteIndex);
    }
    memberData.value = member;
  }

  const allowedRoles = ["owner"];

  // Add the roles permitted, by now only "owner"
  if (!allowedRoles.includes(memberData.value.role || "")) {
    console.error("El usuario no tiene permisos suficientes");
    return navigateTo(siteIndex);
  }
});
