<script setup lang="ts">
definePageMeta({
  middleware: "is-owner",
  layout: "admin",
});
const { logout } = useAuth();
const slug = useRoute().params.slug;
</script>
<template>
  <div>
    dashboard
    <h1>{{ slug }}</h1>
    <UButton @click="logout">Logout</UButton>
  </div>
</template>
