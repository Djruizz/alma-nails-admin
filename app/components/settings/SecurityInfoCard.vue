<script setup lang="ts">
const { login, updatePassword } = useAuth();
const securityFormRef = useTemplateRef("securityForm");

const securityFormState = reactive<SecurityFormSchema>({
  current_password: "",
  new_password: "",
  confirm_new_password: "",
});

const handleSubmit = async () => {
  const user = useSupabaseUser();
  if (!user.value) {
    throw new Error("No se encontro un usuario");
  }
  const res = await login({
    email: user.value.email!,
    password: securityFormState.current_password,
  });
  if (res) {
    return;
  }
  await updatePassword(securityFormState.new_password);
};

const hasChanges: ComputedRef<boolean> = computed(() => {
  return (
    securityFormState.current_password !== "" ||
    securityFormState.new_password !== "" ||
    securityFormState.confirm_new_password !== ""
  );
});
const canceling = ref(false);
const reset = () => {
  canceling.value = true;
  setTimeout(() => {
    Object.assign(securityFormState, {
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    });
    if (securityFormRef.value) {
      securityFormRef.value.errors = [];
    }
    canceling.value = false;
  }, 300);
};
</script>
<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-heroicons-lock-closed"
          class="w-5 h-5 text-primary-500"
        />
        <h3 class="text-base font-semibold text-gray-900 dark:text-white">
          Contraseña y Seguridad
        </h3>
      </div>
    </template>

    <div class="space-y-6 max-w-2xl">
      <UForm
        ref="securityForm"
        class="grid grid-cols-1 md:grid-cols-2 gap-6"
        :schema="securityFormSchema"
        :state="securityFormState"
        @submit="handleSubmit"
        :validate-on-input="true"
        :validate-on-input-delay="100"
      >
        <UFormField label="Contraseña Actual" required name="current_password">
          <UInput
            v-model="securityFormState.current_password"
            class="w-full"
            icon="i-lucide-lock"
            type="password"
            placeholder="Ingrese su contraseña actual"
          />
        </UFormField>

        <UFormField label="Contraseña Nueva" required name="new_password">
          <UInput
            v-model="securityFormState.new_password"
            class="w-full"
            icon="i-lucide-lock"
            type="password"
            placeholder="Ingrese la contraseña nueva"
          />
        </UFormField>

        <UFormField
          label="Confirmar Contraseña Nueva"
          required
          name="confirm_new_password"
        >
          <UInput
            v-model="securityFormState.confirm_new_password"
            class="w-full"
            icon="i-lucide-lock"
            type="password"
            placeholder="Ingrese la contraseña nueva"
          />
        </UFormField>
        <SettingsFormActionButtons
          :hasChanges="hasChanges"
          :canceling="canceling"
          submitLabel="Actualizar Contraseña"
          @reset="reset"
        />
      </UForm>

      <USeparator label="Opciones Adicionales" />

      <div class="flex items-center justify-between">
        <div class="flex flex-col">
          <span class="text-sm font-medium text-gray-900 dark:text-white"
            >Autenticación de dos factores</span
          >
          <span class="text-sm text-gray-500"
            >Aumenta la seguridad de tu cuenta.</span
          >
        </div>
        <USwitch />
      </div>
    </div>

    <template #footer> </template>
  </UCard>
</template>
