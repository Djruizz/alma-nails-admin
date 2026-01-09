<script setup lang="ts">
const { isLoading } = useLoading();
const { fetchProfile } = useProfile();
const toast = useToast();
onMounted(() => {
  try {
    fetchProfile();
  } catch (e: any) {
    toast.add({
      title: e.statusMessage || "Error",
      description: e.data?.message || e.message || "Error al obtener el perfil",
      icon: "i-lucide-circle-alert",
      color: "error",
    });
  }
});
</script>
<template>
  <UHeader title="Alma Nails" :toggle="false">
    <template #right>
      <AuthProfileButton />
    </template>
  </UHeader>
  <UMain class="mb-16">
    <div
      v-if="isLoading"
      class="fixed inset-0 flex items-center justify-center"
    >
      <UIcon
        name="i-heroicons-arrow-path"
        class="w-8 h-8 animate-spin text-primary"
      />
    </div>
    <div v-show="!isLoading">
      <slot></slot>
    </div>
  </UMain>
  <NavbarsBottomNavigation />
</template>
