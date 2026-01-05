<script setup lang="ts">
const { logout } = useAuth();

</script>
<template>
  <div>
    <h1>Home</h1>
    <UButton @click="logout">Logout</UButton>
  </div>
</template>