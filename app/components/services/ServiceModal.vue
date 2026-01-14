<script setup lang="ts">
const { isOpen, serviceState, isEditing, closeModal, saveService } =
  useServiceModal();
</script>

<template>
  <UModal v-model:open="isOpen">
    <template #title>
      {{ isEditing ? "Editar Servicio" : "Nuevo Servicio" }}
    </template>
    <template #description>
      {{
        isEditing
          ? "Ingrese los datos del servicio que desea editar"
          : "Ingrese los datos del nuevo servicio"
      }}
    </template>

    <template #body>
      <div class="grid grid-cols-2 gap-4">
        <!-- Name Field -->
        <UFormField label="Nombre del Servicio" required class="col-span-2">
          <UInput
            v-model="serviceState.name"
            placeholder="Ej: Manicure"
            icon="i-lucide-sparkles"
            class="w-full"
          />
        </UFormField>

        <!-- Price Field -->
        <UFormField label="Precio" required>
          <UInput
            v-model.number="serviceState.price"
            type="number"
            placeholder="0.00"
            icon="i-lucide-dollar-sign"
            step="0.01"
            min="0"
            class="w-full"
          />
        </UFormField>

        <!-- Duration Field -->
        <UFormField label="Duración (minutos)" required>
          <UInput
            v-model.number="serviceState.duration_min"
            type="number"
            placeholder="30"
            icon="i-lucide-clock"
            step="5"
            min="5"
            class="w-full"
          />
        </UFormField>

        <!-- Active Toggle -->
        <UFormField label="Estado" v-if="isEditing">
          <USwitch
            v-model="serviceState.is_active"
            :label="serviceState.is_active ? 'Activo' : 'Inactivo'"
          />
        </UFormField>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton
          label="Cancelar"
          color="neutral"
          variant="ghost"
          @click="closeModal"
        />
        <UButton
          :label="isEditing ? 'Guardar Cambios' : 'Crear Servicio'"
          icon="i-lucide-check"
          @click="saveService"
        />
      </div>
    </template>
  </UModal>
</template>
