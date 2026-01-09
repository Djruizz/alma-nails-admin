<script setup lang="ts">
const securityFormRef = useTemplateRef("securityForm");
const { handleSubmit, changePasswordState, hasChanges, canceling, reset } =
  useSecurityForm(securityFormRef);
</script>
<template>
  <UForm
    ref="securityForm"
    class="grid grid-cols-1 md:grid-cols-2 gap-6"
    :schema="changePasswordSchema"
    :state="changePasswordState"
    @submit="handleSubmit"
  >
    <UFormField label="Contraseña Actual" required name="current_password">
      <UiInputPassword v-model="changePasswordState.current_password" />
    </UFormField>

    <UFormField label="Contraseña Nueva" required name="new_password">
      <UiInputPassword v-model="changePasswordState.new_password" />
    </UFormField>

    <UFormField
      label="Confirmar Contraseña Nueva"
      required
      name="confirm_new_password"
    >
      <UiInputPassword v-model="changePasswordState.confirm_new_password" />
    </UFormField>
    <SettingsFormActionButtons
      :hasChanges="hasChanges"
      :canceling="canceling"
      submitLabel="Actualizar Contraseña"
      @reset="reset"
    />
  </UForm>
</template>
