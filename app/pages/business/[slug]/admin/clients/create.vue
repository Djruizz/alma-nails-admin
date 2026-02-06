<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
const { newClientState, hasChanges, canceling, reset, saveNewClient } =
  useCreateClient();

const formRef = useTemplateRef("formRef");
</script>

<template>
  <UiGoBackButton label="Regresar" />
  <UContainer class="py-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Crear Cliente
      </h1>
      <p class="text-gray-500">Crea un nuevo cliente sin registro</p>
    </div>
    <UCard class="mt-6">
      <UForm
        class="space-y-4"
        @submit="saveNewClient"
        :state="newClientState"
        :schema="newClientSchema"
        ref="formRef"
      >
        <UFormField
          label="Nombre Completo"
          class="w-full"
          name="internal_name"
          required
        >
          <UInput
            placeholder="Nombre"
            class="w-full"
            icon="i-lucide-user"
            v-model="newClientState.internal_name"
          />
        </UFormField>
        <UFormField
          label="Telefono"
          class="w-full"
          name="internal_phone"
          required
        >
          <UInput
            placeholder="3312345678"
            class="w-full"
            icon="i-lucide-phone"
            v-model="newClientState.internal_phone"
          />
        </UFormField>
        <UFormField label="Notas" class="w-full" name="notes">
          <UTextarea
            placeholder="Notas opcionales"
            class="w-full"
            icon="i-lucide-sticky-note"
            v-model="newClientState.notes"
          />
        </UFormField>
        <UFormField
          name="is_active"
          label="Estado"
          orientation="horizontal"
          class="col-span-2 p-2 mt-1 rounded-lg border border-neutral-300 dark:border-neutral-800 items-center"
        >
          <USwitch
            v-model="newClientState.is_active"
            :label="newClientState.is_active ? 'Activo' : 'Inactivo'"
          />
        </UFormField>
        <UiFormActionButtons
          class="pt-4"
          submit-label="Crear Cliente"
          :canceling="canceling"
          :hasChanges="hasChanges"
          @reset="(reset(), formRef?.clear())"
        />
      </UForm>
    </UCard>
  </UContainer>
</template>
