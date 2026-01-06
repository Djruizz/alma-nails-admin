<script setup lang="ts">
const items = [{
  slot: 'general' as const,
  label: 'General',
  icon: 'i-heroicons-user-circle'
}, {
  slot: 'business' as const,
  label: 'Negocio',
  icon: 'i-heroicons-building-storefront'
}, {
  slot: 'security' as const,
  label: 'Seguridad',
  icon: 'i-heroicons-lock-closed'
}]

</script>

<template>
  <UContainer class="py-8 space-y-8 max-w-5xl">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Configuración</h1>
        <p class="text-gray-500 dark:text-gray-400">Gestiona los detalles de tu cuenta y preferencias del negocio.</p>
      </div>
    </div>

    <!-- Main Content Tabs -->
    <UTabs :items="items" class="w-full">
      
      <!-- General Tab -->
      <template #general="{ item }">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <!-- Profile Card -->
          <div class="lg:col-span-2 space-y-6">
            <SettingsProfileInfoCard />
          </div>
        </div>
      </template>

      <!-- Business Tab -->
      <template #business="{ item }">
        <SettingsBusinessInfoCard />
      </template>

      <!-- Security Tab -->
      <template #security="{ item }">
        <div class="grid grid-cols-1 gap-6 mt-6">
          <SettingsSecurityInfoCard />
        </div>
      </template>

    </UTabs>
  </UContainer>
</template>