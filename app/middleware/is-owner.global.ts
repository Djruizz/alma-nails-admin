export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

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

  const { data: business, error: businessError } = await supabase
    .from("business_profiles")
    .select("id, slug")
    .eq("slug", routeSlug)
    .single();

  // Redirect to /index if there is no existing business
  if (businessError || !business) {
    return navigateTo(`/`);
  }

  // Obtener el ID del usuario actual
  const userId = user.value?.id || user.value?.sub;

  // Verificar si el usuario es miembro del negocio
  const { data: member, error: memberError } = await supabase
    .from("business_members")
    .select("role, business_id")
    .eq("user_id", userId)
    .eq("business_id", business.id)
    .maybeSingle();

  const siteIndex = `/business/${routeSlug}/site`;

  // Redirect to the site/index page if there is not permission
  if (memberError || !member) {
    console.error("Error al obtener el miembro:", memberError);
    return navigateTo(siteIndex);
  }

  const allowedRoles = ["owner"];

  // Add the roles permitted, by now only "owner"
  if (!allowedRoles.includes(member.role || "")) {
    console.error("El usuario no tiene permisos suficientes");
    return navigateTo(siteIndex);
  }
});
