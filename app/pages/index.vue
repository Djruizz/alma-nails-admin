<script setup lang="ts">
const { logout } = useAuth();
const { fetchProfile } = useProfile();
onMounted(() => {
  fetchProfile();
});
</script>
<template>
  <div>
    <h1>Home</h1>
    <UButton @click="logout">Logout</UButton>
  </div>
</template>