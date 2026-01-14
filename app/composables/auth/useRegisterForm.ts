import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";
export const useRegisterForm = () => {
  const toast = useToast();
  const loadingButton = ref(false);
  const formFields: AuthFormField[] = [
    {
      name: "full_name",
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
      name: "born_date",
      type: "date",
      label: "Fecha de nacimiento",
      placeholder: "Ingresa tu fecha de nacimiento",
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
    loadingButton.value = true;
    try {
      await signUp(payload.data);
      toast.add({
        title: "¡Cuenta creada!",
        icon: "i-lucide-circle-check",
        color: "primary",
      });
      navigateTo("/");
    } catch (error: any) {
      toast.add({
        title: error.statusMessage || "Error al crear cuenta",
        description:
          error.data?.message || error.message || "Error al crear cuenta",
        icon: "i-lucide-circle-x",
        color: "error",
      });
    } finally {
      loadingButton.value = false;
    }
  };
  return {
    formFields,
    loadingButton,
    handleSubmit,
  };
};
