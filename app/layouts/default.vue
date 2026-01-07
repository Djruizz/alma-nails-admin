<script setup lang="ts">
const { isLoading } = useLoading();
const { fetchProfile } = useProfile();
onMounted(() => {
  fetchProfile();
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
