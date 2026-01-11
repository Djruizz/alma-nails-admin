<script setup lang="ts">
const props = defineProps<{
  hasChanges: boolean;
  canceling: boolean;
  submitLabel: string;
}>();
const emit = defineEmits<{
  reset: [];
  action: [];
}>();
</script>
<template>
  <div class="flex justify-end">
    <div v-if="hasChanges">
      <UButton
        label="Cancelar"
        :loading="canceling"
        color="neutral"
        type="button"
        variant="ghost"
        @click="emit('reset')"
      />
    </div>
    <UButton
      :label="submitLabel"
      color="primary"
      type="submit"
      :disabled="!hasChanges"
      @click="$emit('action')"
    />
  </div>
</template>
