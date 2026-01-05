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
      toast.add({
        title: '¡Éxito!',
        color: 'success'
      });
      navigateTo("/");
    } catch (error: any) {
      toast.add({
        title: "Error de autenticación",
        description: error.data?.message || "Credenciales incorrectas",
        color: "error",
      });
    }
  };
  return {
    formFields,
    handleSubmit,
  };
};
