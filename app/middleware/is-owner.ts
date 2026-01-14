export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  // Si no hay usuario, intentar obtener la sesión de Supabase
  if (!user.value) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Si no hay sesión después de intentar obtenerla, redirigir al login
    if (!session) {
      return navigateTo({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  }

  const routeSlug = to.params.slug;

  // Verificar si el negocio existe
  const { data: business, error: businessError } = await supabase
    .from("business_profiles")
    .select("id, slug")
    .eq("slug", routeSlug as string)
    .single();

  if (businessError || !business) {
    console.error("Error al obtener el negocio:", businessError);
    return navigateTo("/");
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

  if (memberError) {
    console.error("Error al obtener el miembro:", memberError);
    return navigateTo("/");
  }

  if (!member) {
    console.error("El usuario no es miembro de este negocio");
    return navigateTo(`/business/${routeSlug}`);
  }

  const allowedRoles = ["owner"];

  if (!allowedRoles.includes(member.role || "")) {
    console.warn("El usuario no tiene permisos suficientes");
    return navigateTo(`/business/${routeSlug}`);
  }
});
