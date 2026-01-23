<script setup lang="ts">
const props = defineProps<{ label: string }>()
</script>
<template>
    <UButton :label="label" icon="i-lucide-arrow-left" @click="useRouter().back()" variant="ghost" class="my-2" />
</template>