<script setup lang="ts">
import type { ProfileFormSchema } from "@/utils/schemas/ProfileFormSchema";
import type { ZodError } from "zod";
const { profile, updateProfile } = useProfile();

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
  errors.value = {};
  return fields.some(
    (field) => profileState[field] !== initialProfile.value?.[field]
  );
});

const reset = () => {
  if (!initialProfile.value) return;
  Object.assign(profileState, structuredClone(toRaw(initialProfile.value)));
};

const errors = ref<Record<string, string>>({});
const setErrorsFromZod = (error: ZodError) => {
  errors.value = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as string;
    errors.value[key] = issue.message;
  }
};

const saveProfile = async () => {
  if (!hasChanges.value) return;
  const result = profileFormSchema.safeParse(profileState);

  if (!result.success) {
    setErrorsFromZod(result.error);
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
            icon="i-heroicons-camera"
            variant="outline"
          />
          <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
            JPG, GIF o PNG. Max 1MB.
          </p>
        </div>
      </div>

      <UForm class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormField label="Nombre Completo" required>
          <UInput
            v-model="profileState.full_name"
            class="w-full"
            icon="i-heroicons-user"
            type="text"
          />
          <template #error v-if="errors.full_name">
            <span>{{ errors.full_name }}</span>
          </template>
        </UFormField>

        <UFormField label="Teléfono">
          <UInput
            v-model="profileState.phone"
            class="w-full"
            icon="i-heroicons-phone"
            type="tel"
          />
          <template #error v-if="errors.phone">
            <span>{{ errors.phone }}</span>
          </template>
        </UFormField>
      </UForm>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton
          label="Cancelar"
          :disabled="!hasChanges"
          color="neutral"
          variant="ghost"
          @click="reset"
        />
        <UButton
          label="Guardar Cambios"
          :disabled="!hasChanges"
          color="primary"
          @click="saveProfile"
        />
      </div>
    </template>
  </UCard>
</template>
