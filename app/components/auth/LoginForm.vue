<script setup lang="ts">
const { formFields, handleSubmit } = useLoginForm();
</script>
<template>
  <UAuthForm
    title="¡Hola de nuevo!"
    description="Ingresa tus credenciales"
    icon="i-lucide-user"
    :fields="formFields"
    :schema="loginSchema"
    :submit="{
      label: 'Ingresar',
    }"
    @submit="handleSubmit"
  >
    <template #password-hint>
      <ULink to="/" class="text-primary font-medium" tabindex="-1">
        ¿Olvidaste tu contraseña?
      </ULink>
    </template>
  </UAuthForm>
</template>
