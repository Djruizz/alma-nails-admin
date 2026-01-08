<script setup lang="ts">
const business = ref({
  name: "Alma Nails Studio",
  address: "Av. Principal 123, Ciudad de México",
  phone: "55 8765 4321",
  email: "contacto@almanails.com",
  website: "www.almanails.com",
});
const toast = useToast();
function saveBusiness() {
  toast.add({
    title: "Negocio actualizado",
    description: "La información del negocio se ha guardado.",
    icon: "i-heroicons-building-storefront",
    color: "primary",
  });
}
</script>
<template>
  <UCard class="mt-6">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-heroicons-building-storefront"
          class="w-5 h-5 text-primary-500"
        />
        <h3 class="text-base font-semibold text-gray-900 dark:text-white">
          Datos del Negocio
        </h3>
      </div>
    </template>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UFormField label="Nombre del Negocio" required>
        <UInput v-model="business.name" />
      </UFormField>

      <UFormField label="Dirección" class="md:col-span-2">
        <UInput v-model="business.address" icon="i-heroicons-map-pin" />
      </UFormField>

      <UFormField label="Teléfono de Contacto" required>
        <UInput v-model="business.phone" icon="i-heroicons-phone" />
      </UFormField>

      <UFormField label="Email Público">
        <UInput v-model="business.email" icon="i-heroicons-envelope" />
      </UFormField>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <UButton
          label="Actualizar Negocio"
          color="primary"
          @click="saveBusiness"
        />
      </div>
    </template>
  </UCard>
</template>
