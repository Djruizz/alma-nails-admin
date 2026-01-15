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
  <UCard :ui="{ header: 'py-2', footer: 'py-3' }">
    <template #header>
      <div class="flex items-center justify-between m-0">
        <div class="flex-1">
          <h3 class="text-lg font-semibold">
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
    </template>
    <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
      <span class="font-bold text-primary-600 dark:text-primary-400">
        {{ formatPrice(service.price) }}
      </span>
      <USeparator orientation="vertical" class="h-5" />
      <UIcon name="i-lucide-clock" class="w-4 h-4" />
      <span>{{ formatDuration(service.duration_min) }}</span>
    </div>
    <template #footer>
      <div class="flex gap-2">
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
    </template>
  </UCard>
</template>
