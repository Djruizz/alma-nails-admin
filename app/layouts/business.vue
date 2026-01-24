<script setup lang="ts">
const route = useRoute();
const { data: business } = await useFetch(
  `/api/business/public/${route.params.slug}`,
);
</script>
<template>
  <div>
    <UHeader :title="business?.name">
      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>
    <UMain>
      <UContainer class="py-10">
        <slot></slot>
      </UContainer>
    </UMain>
  </div>
</template>
