<script setup lang="ts">
import type { DateValue } from "@internationalized/date";

interface Props {
  modelValue?: DateValue | null;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: "i-lucide-calendar",
});

const emit = defineEmits<{
  "update:modelValue": [value: DateValue | null];
}>();

const inputDate = useTemplateRef("inputDate");

const internalValue = computed<DateValue | undefined>({
  get: () => props.modelValue ?? undefined,
  set: (value) => emit("update:modelValue", value ?? null),
});
</script>

<template>
  <UInputDate ref="inputDate" v-model="internalValue">
    <template #trailing>
      <UPopover :reference="inputDate?.inputsRef[2]?.$el">
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          :icon="icon"
          aria-label="Selecciona una fecha"
          class="px-0"
        />

        <template #content>
          <UCalendar v-model="internalValue" class="p-2" />
        </template>
      </UPopover>
    </template>
  </UInputDate>
</template>
