<script setup lang="ts">
import {
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  type DateValue,
} from "@internationalized/date";
const model = defineModel<string | undefined>();
const formatted = new DateFormatter("es-MX", {
  dateStyle: "medium",
});
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
const buttonLabel = computed(() => {
  if (!internalDate.value) return "Seleccionar fecha";
  return formatted.format(internalDate.value.toDate(getLocalTimeZone()));
});
</script>
<template>
  <UPopover>
    <UButton
      color="neutral"
      variant="outline"
      icon="i-lucide-calendar"
      class="w-full"
      :label="buttonLabel"
    />
    <template #content>
      <UCalendar v-model="internalDate" />
    </template>
  </UPopover>
</template>
