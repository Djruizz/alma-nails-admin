<script setup lang="ts">
const route = useRoute();
const { data: business, error } = await useFetch(
  `/api/business/public/${route.params.slug}`,
);

if (error.value || !business.value) {
  navigateTo("/");
}
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
