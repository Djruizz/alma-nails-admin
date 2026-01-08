<script setup lang="ts">
const model = defineModel<string>();

defineProps<{
  placeholder?: string;
}>();

const showPassword = ref(false);
</script>
<template>
  <UInput
    v-model="model"
    :placeholder="placeholder || 'Password'"
    :type="showPassword ? 'text' : 'password'"
    :ui="{ trailing: 'pe-1' }"
    icon="i-lucide-lock"
    class="w-full"
  >
    <template #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
        :aria-pressed="showPassword"
        aria-controls="password"
        @click="showPassword = !showPassword"
      />
    </template>
  </UInput>
</template>
