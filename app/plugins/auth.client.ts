export default defineNuxtPlugin(async () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  // Esperar a que Supabase restaure la sesión del usuario
  if (!user.value) {
    try {
      await supabase.auth.getSession();
    } catch (error) {
      console.error("Error al obtener la sesión:", error);
    }
  }
});
