import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";
export const useRegisterForm = () => {
  const toast = useToast();
  const formFields: AuthFormField[] = [
    {
      name: "name",
      type: "text",
      label: "Nombre",
      placeholder: "Ingresa tu nombre",
      required: true,
    },
    {
      name: "phone",
      type: "tel",
      label: "Telefono",
      placeholder: "33 1234 5678",
      required: true,
    },
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
  
  const handleSubmit = async (payload: FormSubmitEvent<RegisterSchema>) => {
    const { signUp } = useAuth();

    try {
      await signUp(payload.data); 
      toast.add({
        title: '¡Éxito!',
        color: 'success'
      });
      navigateTo("/");
    } catch (error: any) {
      toast.add({
        title: "Error de autenticación",
        description: error.data?.message || "Error al crear cuenta",
        color: "error",
      });
    }
  };
  return {
    formFields,
    handleSubmit,
  };
};
