<script setup lang="ts">
const props = defineProps<{
    client: ClientResponse;
}>();
</script>

<template>
    <UCard class="hover:shadow-md transition-shadow duration-300 cursor-pointer">
        <template #header>
            <div class="flex items-center justify-between m-0">
                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-primary-600 dark:text-primary-400">
                        {{ client.full_name ?? '' }}
                        <span class="text-sm text-neutral-500">
                            - {{ client.phone ?? '' }}
                        </span>
                    </h3>
                    <span class="text-sm text-neutral-500">Creado el {{ formatDate(client.created_at ?? '') }}</span>
                </div>
                <UBadge :color="client.is_active ? 'success' : 'neutral'" variant="subtle" size="md">
                    {{ client.is_active ? "Activo" : "Inactivo" }}
                </UBadge>
            </div>
        </template>
    </UCard>
</template>