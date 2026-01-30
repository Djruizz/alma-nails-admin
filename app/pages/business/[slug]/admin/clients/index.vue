<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
const { baseAdminRoute } = useNavigation();
const { clients, fetchClients } = useClients();
onMounted(async () => {
  await fetchClients();
});
const navigateToClient = (id: string) => {
  navigateTo(`${baseAdminRoute.value}/clients/${id}`);
};
const searchQuery = ref("");
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
      <div class="grid grid-cols-3 gap-4">
        <UInput
          placeholder="Buscar cliente"
          icon="i-lucide-search"
          class="col-span-2"
          size="lg"
        />
        <UDropdownMenu>
          <UButton
            label="Ordenar"
            icon="i-lucide-filter"
            variant="subtle"
            color="neutral"
          />
        </UDropdownMenu>
      </div>
      <USeparator />
      <div v-if="clients.length > 0">
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
          :description="
            searchQuery
              ? 'No se encontraron clientes con esa búsqueda'
              : 'No tienes clientes registrados'
          "
          color="neutral"
          variant="subtle"
          icon="i-lucide-info"
        />
      </div>
    </div>
  </UContainer>
</template>
