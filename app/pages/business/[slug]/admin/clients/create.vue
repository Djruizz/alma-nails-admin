<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
</script>

<template>
  <UContainer class="py-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Crear Cliente
      </h1>
      <p class="text-gray-500">Crea un nuevo cliente sin registro</p>
    </div>
    <UCard class="mt-6">
      <UForm class="space-y-4">
        <UFormField label="Nombre Completo" class="w-full" required>
          <UInput placeholder="Nombre" class="w-full" />
        </UFormField>
        <UFormField label="Telefono" class="w-full" required>
          <UInput placeholder="3312345678" class="w-full" />
        </UFormField>
        <UFormField label="Notas" class="w-full">
          <UTextarea placeholder="Notas opcionales" class="w-full" />
        </UFormField>
        <UiFormActionButtons
          class="pt-4"
          submit-label="Crear Cliente"
          :canceling="false"
          :hasChanges="false"
          @reset="false"
          @submit="false"
        />
      </UForm>
    </UCard>
  </UContainer>
</template>
