<script setup lang="ts">
interface ServiceDeleteModalProps {
  isOpen: boolean;
  service: Service | null;
}

const props = defineProps<ServiceDeleteModalProps>();

const emit = defineEmits<{
  close: [];
  confirm: [];
}>();
</script>

<template>
  <UModal
    :open="isOpen"
    title="Eliminar Servicio"
    description="Esta acción no se puede deshacer"
    @update:open="(value) => !value && emit('close')"
  >
    <template #body>
      <div v-if="service" class="space-y-4">
        <!-- Warning Banner -->
        <div
          class="flex items-start gap-3 p-4 rounded-lg bg-error-50 dark:bg-error-950/20 border border-error-200 dark:border-error-800"
        >
          <UIcon
            name="i-lucide-triangle-alert"
            class="w-5 h-5 text-error-600 dark:text-error-400 shrink-0 mt-0.5"
          />
          <div class="flex-1">
            <p class="text-sm font-medium text-error-900 dark:text-error-100">
              ¿Estás seguro de que deseas eliminar este servicio?
            </p>
            <p class="text-sm text-error-700 dark:text-error-300 mt-1">
              Esta acción es permanente y no se puede deshacer.
            </p>
          </div>
        </div>

        <!-- Service Details Card -->
        <ServicesServiceCard :service="service" :show-actions="false" />
      </div>
    </template>

    <template #footer="{ close }">
      <div class="flex gap-2 justify-end w-full">
        <UButton
          color="neutral"
          variant="outline"
          label="Cancelar"
          @click="close"
        />
        <UButton
          color="error"
          icon="i-lucide-trash-2"
          label="Eliminar Servicio"
          @click="
            emit('confirm');
            close();
          "
        />
      </div>
    </template>
  </UModal>
</template>
