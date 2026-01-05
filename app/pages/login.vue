<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
const tabItems = [
  { label: "Iniciar sesión", slot: "login", icon: "i-lucide-user" },
  { label: "Registrarse", slot: "register", icon: "i-lucide-user-plus" },
];
</script>

<template>
  <div class="p-4 flex flex-1 items-center justify-center">
    <UPageCard class="w-full max-w-lg p-0">
      <UTabs :items="tabItems" class="gap-4">
        <template #login>
          <AuthLoginForm />
        </template>
        <template #register>
          <AuthRegisterForm />
        </template>
      </UTabs>
    </UPageCard>
  </div>
</template>
