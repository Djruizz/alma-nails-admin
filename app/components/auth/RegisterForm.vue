<script setup lang="ts">
const { formFields, handleSubmit } = useRegisterForm();
</script>
<template>
  <UAuthForm
    title="Registro"
    description="Ingresa tus credenciales"
    icon="i-lucide-user"
    :fields="formFields"
    :schema="registerSchema"
    :submit="{
      label: 'Ingresar',
    }"
    @submit="handleSubmit"
  >
  </UAuthForm>
</template>
