<script setup lang="ts">
const settings = ref({
  notifications: true,
  emailUpdates: true,
  twoFactor: false,
});
const toast = useToast();
function updatePassword() {
  toast.add({
    title: "Seguridad actualizada",
    description: "Tu contraseña ha sido modificada exitosamente.",
    icon: "i-heroicons-shield-check",
  });
}
</script>
<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-lock-closed" class="w-5 h-5 text-primary-500" />
        <h3 class="text-base font-semibold text-gray-900 dark:text-white">
          Contraseña y Seguridad
        </h3>
      </div>
    </template>

    <div class="space-y-6 max-w-2xl">
      <div class="grid gap-4">
        <UFormField label="Nueva Contraseña">
          <UInput type="password" placeholder="••••••••" />
        </UFormField>
        <UFormField label="Confirmar Contraseña">
          <UInput type="password" placeholder="••••••••" />
        </UFormField>
      </div>

      <UDivider label="Opciones Adicionales" />

      <div class="flex items-center justify-between">
        <div class="flex flex-col">
          <span class="text-sm font-medium text-gray-900 dark:text-white"
            >Autenticación de dos factores</span
          >
          <span class="text-sm text-gray-500"
            >Aumenta la seguridad de tu cuenta.</span
          >
        </div>
        <UToggle v-model="settings.twoFactor" />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <UButton
          label="Actualizar Contraseña"
          color="primary"
          @click="updatePassword"
        />
      </div>
    </template>
  </UCard>
</template>
