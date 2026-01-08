<script setup lang="ts">
const { updatePassword } = useAuth();
const toast = useToast();
const securityFormRef = useTemplateRef("securityForm");

const securityFormState = reactive<ChangePasswordSchema>({
  current_password: "",
  new_password: "",
  confirm_new_password: "",
});

const handleSubmit = async () => {
  if (!hasChanges.value) return;
  const result = changePasswordSchema.safeParse(securityFormState);
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
      title: "Error al actualizar la contraseña",
      icon: "i-lucide-circle-alert",
      description: e.statusMessage ?? "Error al actualizar la contraseña",
      color: "error",
    });
    return;
  } finally {
    reset(true);
  }
};

const hasChanges: ComputedRef<boolean> = computed(() => {
  return (
    securityFormState.current_password !== "" ||
    securityFormState.new_password !== "" ||
    securityFormState.confirm_new_password !== ""
  );
});
const canceling = ref(false);
const reset = (inmediate = false) => {
  canceling.value = true;
  setTimeout(
    () => {
      Object.assign(securityFormState, {
        current_password: "",
        new_password: "",
        confirm_new_password: "",
      });
      if (securityFormRef.value) {
        securityFormRef.value.errors = [];
      }
      canceling.value = false;
    },
    inmediate ? 0 : 300
  );
};
</script>
<template>
  <UForm
    ref="securityForm"
    class="grid grid-cols-1 md:grid-cols-2 gap-6"
    :schema="changePasswordSchema"
    :state="securityFormState"
    @submit="handleSubmit"
    :validate-on-input="true"
    :validate-on-input-delay="100"
  >
    <UFormField label="Contraseña Actual" required name="current_password">
      <UiInputPassword v-model="securityFormState.current_password" />
    </UFormField>

    <UFormField label="Contraseña Nueva" required name="new_password">
      <UiInputPassword v-model="securityFormState.new_password" />
    </UFormField>

    <UFormField
      label="Confirmar Contraseña Nueva"
      required
      name="confirm_new_password"
    >
      <UiInputPassword v-model="securityFormState.confirm_new_password" />
    </UFormField>
    <SettingsFormActionButtons
      :hasChanges="hasChanges"
      :canceling="canceling"
      submitLabel="Actualizar Contraseña"
      @reset="reset"
    />
  </UForm>
</template>
