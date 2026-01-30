<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const { services, fetchServices } = useServices();
const {
  openCreateModal,
  openEditModal,
  openDeleteModal,
  closeDeleteModal,
  isDeleteModalOpen,
  deletingService,
  handleDelete,
} = useServiceModal();

onMounted(async () => {
  await fetchServices();
});
</script>

<template>
  <UContainer class="py-8">
    <div class="space-y-6">
      <!-- Header Section -->
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Servicios
          </h1>
          <p class="text-gray-500 dark:text-gray-400">
            Gestiona los servicios que ofreces
          </p>
        </div>
        <UButton
          v-if="services.length > 0"
          icon="i-lucide-plus"
          size="lg"
          label="Agregar Servicio"
          @click="openCreateModal"
        />
      </div>

      <!-- Services Grid -->
      <div
        v-if="services.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <ServicesServiceCard
          v-for="service in services"
          :key="service.id"
          :service="service"
          @edit="openEditModal"
          @delete="openDeleteModal"
        />
      </div>

      <!-- Empty State -->
      <UCard v-else>
        <div class="text-center py-12">
          <UIcon
            name="i-lucide-sparkles"
            class="w-16 h-16 mx-auto text-gray-400 mb-4"
          />
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No hay servicios
          </h3>
          <p class="text-gray-500 mb-6">
            Comienza agregando tu primer servicio
          </p>
          <UButton
            icon="i-lucide-plus"
            label="Agregar Servicio"
            @click="openCreateModal"
          />
        </div>
      </UCard>
    </div>

    <!-- Service Modal -->
    <ServicesServiceModal />

    <!-- Delete Confirmation Modal -->
    <SharedConfirmDeleteModal
      :is-open="isDeleteModalOpen"
      modal-title="Eliminar Servicio"
      modal-description="¿Estás seguro de que deseas eliminar este servicio?"
      modal-button-label="Eliminar Servicio"
      @close="closeDeleteModal"
      @confirm="handleDelete"
    >
      <div v-if="deletingService">
        <ServicesServiceCard :service="deletingService" :show-actions="false" />
      </div>
    </SharedConfirmDeleteModal>
  </UContainer>
</template>
