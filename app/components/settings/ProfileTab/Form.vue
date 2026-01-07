<script setup lang="ts">
const { profile, updateProfile } = useProfile();
const profileFormRef = useTemplateRef("form");

const profileState = reactive<ProfileFormSchema>({
  full_name: "",
  phone: "",
});
const initialProfile = ref<ProfileFormSchema | null>(null);
const fields: (keyof ProfileFormSchema)[] = ["full_name", "phone"];

watch(
  profile,
  (p) => {
    if (!p) return;
    const profileData: ProfileFormSchema = {
      full_name: p.full_name!,
      phone: p.phone,
    };
    Object.assign(profileState, profileData);

    initialProfile.value = { ...profileData };
  },
  { immediate: true }
);

const hasChanges = computed(() => {
  if (!initialProfile.value) return false;
  return fields.some(
    (field) => profileState[field] !== initialProfile.value?.[field]
  );
});
const canceling = ref(false);
const reset = () => {
  canceling.value = true;
  setTimeout(() => {
    if (!initialProfile.value) return;
    Object.assign(profileState, structuredClone(toRaw(initialProfile.value)));
    if (profileFormRef.value) {
      profileFormRef.value.errors = [];
    }
    canceling.value = false;
  }, 300);
};

const saveProfile = async () => {
  if (!hasChanges.value) return;
  const result = profileFormSchema.safeParse(profileState);

  if (!result.success) {
    return;
  }

  await updateProfile(result.data);
  initialProfile.value = structuredClone(toRaw(profileState));
};
</script>
<template>
  <UForm
    ref="form"
    class="grid grid-cols-1 md:grid-cols-2 gap-6"
    :schema="profileFormSchema"
    :state="profileState"
    @submit="saveProfile"
    :validate-on-input-delay="100"
  >
    <UFormField label="Nombre Completo" required name="full_name">
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
    <SettingsFormActionButtons
      :hasChanges="hasChanges"
      submitLabel="Guardar Cambios"
      :canceling="canceling"
      @reset="reset"
    />
  </UForm>
</template>
