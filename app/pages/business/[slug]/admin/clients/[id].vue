<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
const {
  client,
  clientDataState,
  clientBirthday,
  hasChanges,
  canceling,
  reset,
  deleteClientById,
  updateClientData,
} = useClientView();

const openDeleteModal = ref(false);
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
        <div class="flex flex-col justify-center items-center gap-2">
          <UBadge
            :label="client?.is_registered ? 'Registrado' : 'No Registrado'"
            :color="client?.is_registered ? 'primary' : 'warning'"
            variant="subtle"
          />
          <USwitch
            v-model="clientDataState.is_active"
            class="flex items-center"
            color="primary"
            :label="clientDataState.is_active ? 'Activo' : 'Inactivo'"
          />
        </div>
      </div>
    </template>
    <template #default>
      <div class="space-y-4 pb-4">
        <div class="flex justify-between items-center">
          <span class="flex items-center gap-2 text-gray-500">
            <UIcon name="i-lucide-phone" size="20" /> Numero:
          </span>
          {{ client?.display_phone || "No disponible" }}
        </div>
        <div class="flex justify-between items-center">
          <span class="flex items-center gap-2 text-gray-500">
            <UIcon name="i-lucide-mail" size="20" /> Email:
          </span>
          {{ client?.display_email || "No disponible" }}
        </div>
        <div class="flex justify-between items-center">
          <span class="flex items-center gap-2 text-gray-500">
            <UIcon name="i-lucide-calendar" size="20" /> Fecha de nacimiento:
          </span>
          {{ clientBirthday || "No disponible" }}
        </div>
      </div>
      <UForm
        :state="clientDataState"
        :schema="clientUpdateSchema"
        @submit="updateClientData"
        class="w-full"
      >
        <UFormField label="Notas:" class="w-full pt-2" name="notes">
          <UTextarea v-model="clientDataState.notes" class="w-full" />
        </UFormField>
        <UiFormActionButtons
          class="pt-4"
          :hasChanges="hasChanges"
          submit-label="Guardar"
          :canceling="canceling"
          @reset="reset"
        />
      </UForm>
    </template>
    <template #footer v-if="!client?.is_registered">
      <UButton
        label="Borrar cliente"
        @click="openDeleteModal = true"
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
  <SharedConfirmDeleteModal
    :is-open="openDeleteModal"
    modal-title="Eliminar Cliente"
    modal-description="¿Estás seguro de que deseas eliminar este cliente?"
    modal-button-label="Eliminar Cliente"
    @close="openDeleteModal = false"
    @confirm="deleteClientById()"
  >
    <ClientsClientCard v-if="client" :client="client" />
  </SharedConfirmDeleteModal>
</template>
