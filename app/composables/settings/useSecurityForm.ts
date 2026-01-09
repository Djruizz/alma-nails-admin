export const useSecurityForm = (formRef: any) => {
  const { updatePassword } = useAuth();
  const toast = useToast();
  const initialState: ChangePasswordSchema = {
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  };
  const changePasswordState = reactive<ChangePasswordSchema>({
    ...initialState,
  });
  const fields: (keyof ChangePasswordSchema)[] = [
    "current_password",
    "new_password",
    "confirm_new_password",
  ];

  const hasChanges = computed(() => {
    return fields.some(
      (field) => changePasswordState[field] !== initialState[field]
    );
  });
  const canceling = ref(false);
  const reset = (inmediate = false) => {
    canceling.value = true;
    setTimeout(
      () => {
        Object.assign(changePasswordState, initialState);
        formRef.value?.clear();
        canceling.value = false;
      },
      inmediate ? 0 : 300
    );
  };
  const handleSubmit = async () => {
    if (!hasChanges.value) return;
    const result = changePasswordSchema.safeParse(changePasswordState);
    if (!result.success) return;

    try {
      await updatePassword(result.data);
      toast.add({
        title: "Contraseña actualizada",
        description: "Se ha actualizado la contraseña exitosamente",
        icon: "i-lucide-circle-check",
        color: "primary",
      });
    } catch (e: any) {
      toast.add({
        title: e.statusMessage || "Error al actualizar la contraseña",
        icon: "i-lucide-circle-alert",
        description:
          e.data?.message || e.message || "Error al actualizar la contraseña",
        color: "error",
      });
      return;
    } finally {
      reset(true);
    }
  };

  return {
    changePasswordState,
    hasChanges,
    canceling,
    reset,
    handleSubmit,
  };
};
