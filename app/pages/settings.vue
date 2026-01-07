<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

const items: TabsItem[] = [
  {
    slot: "general" as const,
    label: "General",
    value: "general",
    icon: "i-heroicons-user-circle",
  },
  {
    slot: "business" as const,
    label: "Negocio",
    value: "business",
    icon: "i-heroicons-building-storefront",
  },
  {
    slot: "security" as const,
    label: "Seguridad",
    value: "security",
    icon: "i-heroicons-lock-closed",
  },
];
const activeTab = ref<string>(
  localStorage.getItem("settingsTabSelected") ?? "general"
);

// persistencia automática
watch(activeTab, (tab) => {
  localStorage.setItem("settingsTabSelected", tab);
});
</script>

<template>
  <UContainer class="py-8 space-y-8 max-w-5xl">
    <!-- Header Section -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Configuración
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          Gestiona los detalles de tu cuenta y preferencias del negocio.
        </p>
      </div>
    </div>

    <!-- Main Content Tabs -->
    <UTabs v-model="activeTab" :items="items" class="w-full gap-6">
      <!-- General Tab -->
      <template #general="{ item }">
        <SettingsProfileTabInfoCard />
      </template>

      <!-- Business Tab -->
      <template #business="{ item }">
        <SettingsBusinessInfoCard />
      </template>

      <!-- Security Tab -->
      <template #security="{ item }">
        <SettingsSecurityTabInfoCard />
      </template>
    </UTabs>
  </UContainer>
</template>
