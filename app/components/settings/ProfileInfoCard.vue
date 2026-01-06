<script setup lang="ts">
import type { ProfileInsert } from "@/types/profile.types";
// const profile = ref({
//   name: "Admin Alma Nails",
//   email: "admin@almanails.com",
//   phone: "55 1234 5678",
//   username: "admin_alma",
//   avatar: "https://avatars.githubusercontent.com/u/739984?v=4",
//   bio: "Administrador principal del sistema.",
// });
const {profile} = useProfile()

const profileState = reactive<ProfileInsert>(profile.value || {
  full_name: "",
  email: "",
  phone: "",
})
watch(profile, (p) => {
  if (!p) return
  Object.assign(profileState, p)
})

const toast = useToast();
function saveProfile() {
  toast.add({
    title: "Perfil actualizado",
    description: "Los cambios se han guardado correctamente.",
    icon: "i-heroicons-check-circle",
  });
}
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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormField label="Nombre Completo" required>
          <UInput
            v-model="profileState.full_name"
            class="w-full"
            icon="i-heroicons-user"
          />
        </UFormField>

        <UFormField label="Correo Electrónico" required>
          <UInput v-model="profileState.email" class="w-full" icon="i-heroicons-envelope" />
        </UFormField>

        <UFormField label="Teléfono">
          <UInput v-model="profileState.phone" class="w-full" icon="i-heroicons-phone" />
        </UFormField>
      </div>

      <UFormField label="Biografía">
        <UTextarea v-model="profileState.phone" :rows="3" class="w-full" />
      </UFormField>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton label="Cancelar" color="neutral" variant="ghost" />
        <UButton label="Guardar Cambios" color="primary" @click="saveProfile" />
      </div>
    </template>
  </UCard>
</template>
