<script setup lang="ts"></script>
<template>
  <UCard class="mt-6">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-heroicons-building-storefront"
          class="w-5 h-5 text-primary-500"
        />
        <h3 class="text-base font-semibold text-gray-900 dark:text-white">
          Datos del Negocio
        </h3>
      </div>
      <div class="text-xs text-gray-500 dark:text-gray-400">
        Creado el {{ new Date().toLocaleDateString() }}
      </div>
    </template>
    <SettingsBusinessTabForm />
  </UCard>
</template>
