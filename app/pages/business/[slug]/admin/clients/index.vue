<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
const { baseAdminRoute } = useNavigation();
const { clients, fetchClients, sortClients } = useClients();
const { searchInput } = useFilters();

onMounted(async () => {
  await fetchClients(false);
});

const navigateToClient = (id: string) => {
  navigateTo(`${baseAdminRoute.value}/clients/${id}`);
};

const route = useRoute();
watch(
  () => route.query,
  async () => {
    await sortClients();
  },
  { deep: true },
);
</script>

<template>
  <UContainer class="py-8">
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Clientes
        </h1>
        <p class="text-gray-500">Gestiona tus clientes y suscripciones</p>
      </div>
      <div class="flex gap-4">
        <UInput
          v-model="searchInput"
          placeholder="Buscar cliente"
          icon="i-lucide-search"
          class="flex-1"
          size="md"
        />
        <ClientsFilterDropdown />
      </div>
      <USeparator />
      <div class="flex justify-between">
        <UBadge color="neutral" variant="subtle">
          <p>Clientes encontrados: {{ clients.length }}</p>
        </UBadge>
        <UButton icon="i-lucide-plus" variant="subtle" color="neutral">
          <span class="hidden sm:block">Crear cliente</span>
        </UButton>
      </div>
      <div v-if="clients.length > 0" class="space-y-4">
        <ClientsClientCard
          v-for="client in clients"
          :key="client.id ?? ''"
          :client="client"
          @click="navigateToClient(client.id ?? '')"
        />
      </div>
      <div v-else>
        <UAlert
          title="No hay clientes"
          description="No se encontraron clientes"
          color="neutral"
          variant="subtle"
          icon="i-lucide-info"
        />
      </div>
    </div>
  </UContainer>
</template>
