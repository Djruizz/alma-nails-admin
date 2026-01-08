<script setup lang="ts">
const { profile } = useProfile();
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
            icon="i-lucide-camera"
            variant="outline"
          />
          <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
            JPG, GIF o PNG. Max 1MB.
          </p>
        </div>
      </div>

      <SettingsProfileTabForm />
    </div>
  </UCard>
</template>
