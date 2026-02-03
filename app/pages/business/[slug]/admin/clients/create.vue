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
      <p class="text-gray-500">Crea un nuevo cliente</p>
    </div>
    <UForm>
      <UFormField label="Nombre">
        <UInput placeholder="Nombre" />
      </UFormField>
      <UFormField label="Apellido">
        <UInput placeholder="Apellido" />
      </UFormField>
      <UFormField label="Email">
        <UInput placeholder="Email" />
      </UFormField>
      <UFormField label="Telefono">
        <UInput placeholder="Telefono" />
      </UFormField>
    </UForm>
  </UContainer>
</template>
