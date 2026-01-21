<script setup lang="ts">
definePageMeta({
  middleware: "is-owner",
  layout: "admin",
});
const { fetchClient } = useClients();
const clientId = useRoute().params.id?.toString();
if (!clientId) {
  throw createError({
    statusCode: 404,
    statusMessage: "Cliente no encontrado",
  });
}
const client = ref<ClientWithProfile | null>(null)

client.value = await fetchClient(clientId)

const clientNotes = computed(() => client.value?.notes ?? "")

</script>
<template>
  <UButton label="Go Back" icon="i-lucide-arrow-left" @click="useRouter().back()" variant="ghost" class="my-2" />
  <UCard class="m-4 bg-gray-50 dark:bg-gray-900">
    <template #header>
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-xl font-semibold">Cliente: {{ client?.full_name }}</h1>
          <p class="text-sm">
            Desde el {{ formatDate(client?.created_at ?? "") }}
          </p>
        </div>
        <UBadge :label="client?.is_active ? 'Activo' : 'Inactivo'" :color="client?.is_active ? 'success' : 'error'"
          variant="subtle" />
      </div>
    </template>
    <template #default>
      <div class="space-y-4 pb-4">
        <div class="flex justify-between items-center">
          <span class="flex items-center gap-2 text-gray-500">
            <UIcon name="i-lucide-phone" size="20" /> Numero:
          </span>
          {{ client?.phone }}
        </div>
        <div class="flex justify-between items-center">
          <span class="flex items-center gap-2 text-gray-500">
            <UIcon name="i-lucide-mail" size="20" /> Email:
          </span>
          {{ client?.email }}
        </div>
        <div class="flex justify-between items-center">
          <span class="flex items-center gap-2 text-gray-500">
            <UIcon name="i-lucide-calendar" size="20" /> Fecha de nacimiento:
          </span>
          {{ formatDate(client?.born_date ?? "", { day: "numeric", month: "short", year: "numeric" }) }}
        </div>
      </div>
      <UFormField label="Notas:" class="w-full pt-2">
        <UTextarea v-model="clientNotes" class="w-full" />
      </UFormField>
    </template>
  </UCard>
</template>
