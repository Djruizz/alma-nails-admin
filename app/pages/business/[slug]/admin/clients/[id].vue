<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
const { client, clientNotes, clientBirthday, deleteClientById } =
  useClientView();
</script>
<template>
  <UiGoBackButton label="Regresar" />
  <UCard v-if="client" class="m-4 bg-gray-50 dark:bg-gray-900">
    <template #header>
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-xl font-semibold">
            {{ client?.display_full_name }}
          </h1>
          <p class="text-sm">
            Desde el {{ formatDate(client?.created_at ?? "") }}
          </p>
        </div>
        <UBadge
          :label="client?.is_active ? 'Activo' : 'Inactivo'"
          :color="client?.is_active ? 'success' : 'error'"
          variant="subtle"
        />
      </div>
    </template>
    <template #default>
      <div class="space-y-4 pb-4">
        <div class="flex justify-between items-center">
          <span class="flex items-center gap-2 text-gray-500">
            <UIcon name="i-lucide-phone" size="20" /> Numero:
          </span>
          {{ client?.display_phone }}
        </div>
        <div class="flex justify-between items-center">
          <span class="flex items-center gap-2 text-gray-500">
            <UIcon name="i-lucide-mail" size="20" /> Email:
          </span>
          {{ client?.display_email }}
        </div>
        <div class="flex justify-between items-center">
          <span class="flex items-center gap-2 text-gray-500">
            <UIcon name="i-lucide-calendar" size="20" /> Fecha de nacimiento:
          </span>
          {{ clientBirthday }}
        </div>
      </div>
      <UFormField label="Notas:" class="w-full pt-2">
        <UTextarea v-model="clientNotes" class="w-full" />
      </UFormField>
    </template>
    <template #footer>
      <UButton
        label="Borrar cliente"
        @click="deleteClientById()"
        color="error"
        variant="subtle"
      />
    </template>
  </UCard>
  <UCard v-else class="m-4 bg-gray-50 dark:bg-gray-900">
    <template #header>
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-xl font-semibold">Cliente no encontrado</h1>
        </div>
      </div>
    </template>
  </UCard>
</template>
