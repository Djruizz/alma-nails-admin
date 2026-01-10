<script setup lang="ts">
import { parseDate, type DateValue } from "@internationalized/date";
const model = defineModel<string>();
const internalDate = computed({
  get: () => {
    if (!model.value) return undefined;
    try {
      return parseDate(model.value);
    } catch (e) {
      console.error("Fecha inválida", e);
      return undefined;
    }
  },
  set: (val: DateValue | undefined) => {
    model.value = val ? val.toString() : undefined;
  },
});
</script>
<template>
  <UInputDate
    v-model="internalDate"
    class="w-full"
    locale="es-MX"
    icon="i-lucide-calendar"
  />
</template>
