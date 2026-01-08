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
      <SettingsSecurityTabForm />

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
