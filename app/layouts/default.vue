<script setup lang="ts"></script>
<template>
  <UHeader title="Alma Nails" :toggle="false">
    <template #right>
      <UColorModeButton />
      <AuthProfileButton />
    </template>
  </UHeader>
  <UMain>
    <slot></slot>
  </UMain>
  <NavbarsBottomNavigation />
</template>
