<script setup lang="ts">
import { type DropdownMenuItem } from "@nuxt/ui";


const { logout } = useAuth();

const userItems = ref<DropdownMenuItem[]>([
  [{ label: 'email', icon: "i-lucide-user", type: "label" }],
  [
    { label: "Account settings", icon: "i-lucide-settings", value: "settings" },
    {
      label: "Log Out",
      icon: "i-lucide-log-out",
      color: "error",
      onSelect() {
        logout();
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
  >
    <UButton
      variant="soft"
      color="neutral"
    >
      <UUser
        :avatar="{
          src: '',
          icon: 'i-lucide-user',
          class: 'border border-primary',
        }"
        class="gap-0"
      />
    </UButton>
  </UDropdownMenu>
</template>