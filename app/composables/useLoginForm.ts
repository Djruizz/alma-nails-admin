import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";
export const useLoginForm = () => {
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
    const user = await login(payload.data);
  };
  return {
    formFields,
    handleSubmit,
  };
};
