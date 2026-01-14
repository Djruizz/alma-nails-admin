import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";
export const useLoginForm = () => {
  const toast = useToast();
  const formFields: AuthFormField[] = [
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Ingresa tu email",
      required: true,
    },
    {
      name: "password",
      type: "password",
      label: "Contraseña",
      placeholder: "Ingresa tu contraseña",
      required: true,
    },
  ];
  const handleSubmit = async (payload: FormSubmitEvent<LoginSchema>) => {
    const { login } = useAuth();
    const route = useRoute();
    const supabase = useSupabaseClient();

    try {
      const user = await login(payload.data);

      // Verificar si hay una ruta de redirección en el query
      const redirectTo = route.query.redirect as string;

      if (redirectTo) {
        // Si hay una ruta de redirección, navegar ahí
        await navigateTo(redirectTo);
      } else {
        // Si no, buscar el negocio del usuario
        const { data: member } = await supabase
          .from("business_members")
          .select("business_id, business_profiles(slug)")
          .eq("user_id", user.user.id)
          .maybeSingle();

        if (member && member.business_profiles) {
          const slug = member.business_profiles.slug;
          await navigateTo(`/business/${slug}/dashboard`);
        } else {
          // Si no tiene negocio, ir a la página principal
          await navigateTo("/");
        }
      }

      toast.add({
        title: "¡Bienvenido!",
        icon: "i-lucide-circle-check",
        color: "primary",
      });
    } catch (error: any) {
      toast.add({
        title: error.statusMessage || "Error de autenticación",
        icon: "i-lucide-circle-x",
        description:
          error.data?.message || error.message || "Credenciales incorrectas",
        color: "error",
      });
    }
  };
  return {
    formFields,
    handleSubmit,
  };
};
