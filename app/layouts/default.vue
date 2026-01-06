<script setup lang="ts">
const { isLoading } = useLoading();
</script>
<template>
  <UHeader title="Alma Nails" :toggle="false">
    <template #right>
      <UColorModeButton />
      <AuthProfileButton />
    </template>
  </UHeader>
  <UMain class="mb-16">
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center">
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
