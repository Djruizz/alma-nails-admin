<script setup lang="ts">
interface ConfirmDeleteModalProps {
  isOpen: boolean;
  modalTitle?: string;
  modalDescription?: string;
  modalButtonLabel?: string;
}

const props = defineProps<ConfirmDeleteModalProps>();

const emit = defineEmits<{
  close: [];
  confirm: [];
}>();
</script>

<template>
  <UModal
    :open="isOpen"
    :title="modalTitle || 'Eliminar'"
    description="Confirmar eliminación"
    @update:open="(value) => !value && emit('close')"
  >
    <template #body>
      <div class="space-y-4">
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
              {{
                modalDescription ||
                "¿Estás seguro de que deseas eliminar este elemento?"
              }}
            </p>
            <p class="text-sm text-error-700 dark:text-error-300 mt-1">
              Esta acción es permanente y no se puede deshacer.
            </p>
          </div>
        </div>

        <div>
          <slot></slot>
        </div>
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
          :label="modalButtonLabel || 'Eliminar'"
          @click="
            emit('confirm');
            close();
          "
        />
      </div>
    </template>
  </UModal>
</template>
