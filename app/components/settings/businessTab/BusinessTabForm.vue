<script setup lang="ts">
const businessState: any = reactive({
  name: "",
  phone: "",
  description: "",
  address: "",
  email: "",
});
</script>

<template>
  <UForm class="grid grid-cols-2 gap-6">
    <UFormField label="Nombre del Negocio" :required="true" class="col-span-1">
      <UInput
        v-model="businessState.name"
        class="w-full"
        icon="i-lucide-store"
      />
    </UFormField>

    <UFormField
      label="Teléfono de Contacto"
      :required="true"
      class="col-span-1"
    >
      <UInput
        v-model="businessState.phone"
        class="w-full"
        icon="i-heroicons-phone"
      />
    </UFormField>

    <UFormField
      label="Descripción del Negocio"
      :required="true"
      class="col-span-2"
    >
      <UTextarea
        v-model="businessState.description"
        class="w-full"
        :rows="4"
        icon="i-lucide-text"
      />
    </UFormField>

    <UFormField label="Email Público" :required="true" class="col-span-2">
      <UInput
        v-model="businessState.email"
        class="w-full"
        icon="i-heroicons-envelope"
        type="email"
      />
    </UFormField>

    <UFormField label="Dirección" :required="true" class="col-span-2">
      <UInput
        v-model="businessState.address"
        class="w-full"
        icon="i-heroicons-map-pin"
      />
    </UFormField>

    <SettingsFormActionButtons
      :has-changes="false"
      :canceling="false"
      submit-label="Guardar"
      class="col-span-2"
    />
  </UForm>
</template>
