<script setup lang="ts">
const { isLoading } = useLoading();
const { fetchProfile } = useProfile();
const { fetchBusiness } = useBusiness();
const toast = useToast();
onMounted(() => {
  try {
    fetchProfile();
    fetchBusiness();
  } catch (e: any) {
    toast.add({
      title: e.statusMessage || "Error",
      description:
        e.data?.message || e.message || "Error al cargar la informacion",
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
      class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
    >
      <UIcon
        name="i-heroicons-arrow-path"
        class="w-8 h-8 animate-spin text-primary"
      />
    </div>
    <div>
      <slot></slot>
    </div>
  </UMain>
  <NavbarsBottomNavigation />
</template>
