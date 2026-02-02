<script setup lang="ts">
const props = defineProps<{
  client: ClientWithProfile;
}>();
</script>

<template>
  <UCard class="hover:shadow-md transition-shadow duration-300 cursor-pointer">
    <template #header>
      <div class="flex items-center justify-between m-0">
        <div class="flex-1">
          <h3
            class="text-lg font-semibold text-primary-600 dark:text-primary-400"
          >
            {{ client.display_full_name ?? "" }}
            <span class="text-sm text-neutral-500">
              - {{ client.display_phone ?? "Sin número" }}
            </span>
          </h3>
          <span class="text-sm text-neutral-500"
            >Creado el {{ formatDate(client.created_at ?? "") }}</span
          >
        </div>
        <div class="flex flex-col items-center gap-2">
          <UBadge
            :color="client.is_active ? 'success' : 'neutral'"
            variant="subtle"
            size="md"
            :label="client.is_active ? 'Activo' : 'Inactivo'"
          />
          <UBadge
            :color="client.is_registered ? 'primary' : 'warning'"
            variant="subtle"
            size="md"
            :label="client.is_registered ? 'Registrado' : 'No registrado'"
          />
        </div>
      </div>
    </template>
  </UCard>
</template>
