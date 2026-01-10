<script setup lang="ts">
const form = useTemplateRef("form");
const { profileState, hasChanges, canceling, reset, saveProfile } =
  useProfileForm(form);
</script>
<template>
  <UForm
    ref="form"
    class="grid grid-cols-2 gap-6"
    :schema="profileFormSchema"
    :state="profileState"
    @submit="saveProfile"
    :validate-on-input-delay="100"
  >
    <UFormField
      label="Nombre Completo"
      required
      name="full_name"
      class="col-span-2"
    >
      <UInput
        v-model="profileState.full_name"
        class="w-full"
        icon="i-lucide-user"
        type="text"
      />
    </UFormField>

    <UFormField label="Teléfono" name="phone">
      <UInput
        v-model="profileState.phone"
        class="w-full"
        icon="i-lucide-phone"
        type="tel"
      />
    </UFormField>
    <UFormField label="Fecha de Nacimiento" name="born_date">
      <UiInputDate
        v-model="profileState.born_date"
        class="w-full"
        icon="i-lucide-calendar"
      />
    </UFormField>
    <SettingsFormActionButtons
      :hasChanges="hasChanges"
      submitLabel="Guardar Cambios"
      :canceling="canceling"
      @reset="reset"
      class="col-span-2"
    />
  </UForm>
</template>
