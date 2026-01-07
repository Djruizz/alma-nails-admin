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
  console.log(canSubmit.value);
  if (!hasChanges.value) return;
  const result = profileFormSchema.safeParse(profileState);

  if (!result.success) {
    return;
  }

  await updateProfile(result.data);
  initialProfile.value = structuredClone(toRaw(profileState));
};
const createdDate = computed(() => {
  if (!profile.value) return "";
  return formatDate(profile.value.created_at, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
const canSubmit: Ref<boolean> = computed(() => {
  if (!hasChanges.value) return false;
  if (profileFormRef.value) {
    return profileFormRef.value.errors.length === 0;
  }
  return false;
});
</script>
<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-user" class="w-5 h-5 text-primary-500" />
        <h3
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          Información Personal
        </h3>
      </div>
      <div class="text-xs text-gray-500 dark:text-gray-400">
        Miembro desde {{ createdDate }}
      </div>
    </template>

    <div class="space-y-6">
      <div class="flex items-center gap-6">
        <!-- <UAvatar :src="profile.avatar" alt="Avatar" size="3xl" /> -->
        <div class="flex-1">
          <UButton
            color="neutral"
            label="Cambiar Foto"
            size="sm"
            icon="i-lucide-camera"
            variant="outline"
          />
          <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
            JPG, GIF o PNG. Max 1MB.
          </p>
        </div>
      </div>

      <<UForm
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
        </UFormField> </UForm
      >>
    </div>

    <template #footer>
      <SettingsFormActionButtons
        :hasChanges="hasChanges"
        submitLabel="Guardar Cambios"
        :canceling="canceling"
        @reset="reset"
      />
    </template>
  </UCard>
</template>
