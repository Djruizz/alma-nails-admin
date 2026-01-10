<script setup lang="ts">
const form = useTemplateRef("form");
const { businessState, reset, saveBusiness, hasChanges, canceling } =
  useBusinessInfoForm(form);
</script>

<template>
  <UForm
    ref="form"
    class="grid grid-cols-2 gap-6"
    :schema="businessInfoFormSchema"
    :state="businessState"
    @submit="saveBusiness"
    :validate-on-input-delay="100"
  >
    <UFormField
      label="Nombre del Negocio"
      :required="true"
      name="name"
      class="col-span-1"
    >
      <UInput
        v-model="businessState.name"
        class="w-full"
        icon="i-lucide-store"
      />
    </UFormField>

    <UFormField
      label="Teléfono de Contacto"
      :required="true"
      name="phone"
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
      name="description"
      class="col-span-2"
    >
      <UTextarea
        v-model="businessState.description"
        class="w-full"
        :rows="4"
        icon="i-lucide-text"
      />
    </UFormField>

    <UFormField
      label="Email Público"
      :required="true"
      name="email"
      class="col-span-2"
    >
      <UInput
        v-model="businessState.email"
        class="w-full"
        icon="i-heroicons-envelope"
        type="email"
      />
    </UFormField>

    <UFormField
      label="Dirección"
      :required="true"
      name="address"
      class="col-span-2"
    >
      <UInput
        v-model="businessState.address"
        class="w-full"
        icon="i-heroicons-map-pin"
      />
    </UFormField>

    <SettingsFormActionButtons
      :has-changes="hasChanges"
      :canceling="canceling"
      @reset="reset"
      submit-label="Actualizar Información"
      class="col-span-2"
    />
  </UForm>
</template>
