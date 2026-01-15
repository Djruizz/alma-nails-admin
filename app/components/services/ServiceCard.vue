<script setup lang="ts">
interface ServiceCardProps {
  service: Service;
  showActions?: boolean;
}

const props = withDefaults(defineProps<ServiceCardProps>(), {
  showActions: true,
});

const emit = defineEmits<{
  edit: [service: Service];
  delete: [service: Service];
}>();
</script>

<template>
  <UCard>
    <div class="space-y-4">
      <!-- Service Header -->
      <div class="flex items-start justify-between m-0">
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {{ service.name }}
          </h3>
        </div>
        <UBadge
          :color="service.is_active ? 'success' : 'neutral'"
          variant="subtle"
          size="md"
        >
          {{ service.is_active ? "Activo" : "Inactivo" }}
        </UBadge>
      </div>

      <!-- Service Details -->
      <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <p class="font-bold text-primary-600 dark:text-primary-400">
          {{ formatPrice(service.price) }}
        </p>
        <USeparator orientation="vertical" class="h-4" />
        <UIcon name="i-lucide-clock" class="w-4 h-4" />
        <span>{{ formatDuration(service.duration_min) }}</span>
      </div>

      <!-- Actions -->
      <div
        class="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700"
      >
        <UButton
          icon="i-lucide-pencil"
          size="sm"
          color="neutral"
          variant="outline"
          label="Editar"
          class="flex-1 justify-center"
          @click="emit('edit', service)"
        />
        <UButton
          icon="i-lucide-trash-2"
          size="sm"
          color="error"
          variant="subtle"
          label="Eliminar"
          class="flex-1 justify-center"
          @click="emit('delete', service)"
        />
      </div>
    </div>
  </UCard>
</template>
