<script setup lang="ts">
import { type DropdownMenuItem } from "@nuxt/ui";
const { settingsButton } = useNavigation();
const { logout } = useAuth();
const { firstName, profile } = useProfile();
const user = useSupabaseUser();
const email = computed(() => user.value?.email);
// const avatarUrl = computed(() => profile?.avatar_url);
const avatarUrl = "https://github.com/benjamincanac.png";
const userItems = ref<DropdownMenuItem[]>([
  [
    {
      label: firstName,
      avatar: {
        src: avatarUrl,
        alt: firstName,
        class: avatarUrl ? "border-none" : "border border-neutral-200",
      },
      type: "label",
      slot: "name" as const,
    },
    {
      icon: "i-lucide-mail",
      type: "label",
      slot: "email" as const,
    },
  ],
  [
    {
      label: "Mi Perfil",
      icon: "i-lucide-user-round-cog",
      to: settingsButton.value.to,
    },
  ],
  [
    {
      label: "Tema",
      slot: "color-mode" as const,
    },
    {
      label: "Reportar Problema",
      icon: "i-lucide-bug",
      to: "",
    },
    {
      label: "Cerrar Sesión",
      icon: "i-lucide-log-out",
      color: "error",
      onSelect: async () => {
        try {
          await logout();
        } catch (error: any) {
          const toast = useToast();
          toast.add({
            title: error.statusMessage || "Error",
            description:
              error.data?.message || error.message || "Error al cerrar sesión",
            icon: "i-lucide-circle-alert",
            color: "error",
          });
        }
      },
    },
  ],
]);
</script>
<template>
  <UDropdownMenu
    class="justify-between cursor-pointer"
    :items="userItems"
    :content="{ align: 'center', side: 'bottom' }"
    arrow
    portal
    :portal-target="'body'"
  >
    <UButton
      variant="soft"
      color="neutral"
      trailing-icon="i-lucide-chevron-down"
      class="transition-colors duration-200 active:bg-neutral-100 dark:active:bg-neutral-800"
    >
      <UUser
        :avatar="{
          src: avatarUrl,
          alt: firstName,
          class: avatarUrl ? 'border-none' : 'border border-neutral-200',
        }"
        class="gap-0"
      />
    </UButton>
    <template #name-trailing>
      <UBadge
        v-if="profile?.role"
        :label="profile?.role"
        :color="profile?.role === 'admin' ? 'primary' : 'neutral'"
      />
    </template>
    <template #email-label>
      <div class="max-w-36 truncate">{{ email }}aaaaaaaaa</div>
    </template>
    <template #color-mode-trailing>
      <UColorModeSwitch size="lg" @click.stop />
    </template>
  </UDropdownMenu>
</template>
