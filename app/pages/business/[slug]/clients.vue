<script setup lang="ts">
definePageMeta({
  middleware: "is-owner",
  layout: "admin",
});
const { clients, fetchClients } = useClients();
onMounted(async () => {
  await fetchClients();
});
</script>

<template>
  <UContainer class="py-8">
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Clientes
        </h1>
        <p class="text-gray-500">
          Gestiona tus clientes y suscripciones
        </p>
      </div>
      <div class="grid grid-cols-3 gap-4">

        <UInput placeholder="Buscar cliente" icon="i-lucide-search" class="col-span-2" size="lg" />
        <UDropdownMenu>
          <UButton label="Ordenar" icon="i-lucide-filter" variant="subtle" color="neutral" />
        </UDropdownMenu>
      </div>
      <USeparator />
      <ClientsClientCard v-for="client in clients" :key="client.id ?? ''" :client="client" />
    </div>
  </UContainer>
</template>
