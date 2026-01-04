<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
const { formFields, handleSubmit } = useLoginForm();
</script>

<template>
  <div class="p-4 flex flex-1 items-center justify-center">
    <UPageCard class="w-full max-w-sm p-5">
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
    </UPageCard>
  </div>
</template>
