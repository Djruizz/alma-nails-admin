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

    try {
      await login(payload.data);
      navigateTo("/");
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
