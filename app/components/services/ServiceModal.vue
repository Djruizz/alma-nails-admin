<script setup lang="ts">
const { isOpen, serviceState, isEditing, closeModal, saveService } =
  useServiceModal();
const formRef = useTemplateRef("formRef");
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
      <div class="">
        <UForm
          :state="serviceState"
          :schema="serviceSchema"
          class="grid grid-cols-2 gap-4"
          ref="formRef"
          @submit="saveService"
          :validate-on-input-delay="100"
        >
          <!-- Name Field -->
          <UFormField
            name="name"
            label="Nombre del Servicio"
            required
            class="col-span-2"
          >
            <UInput
              v-model="serviceState.name"
              placeholder="Ej: Manicure"
              icon="i-lucide-sparkles"
              class="w-full"
            />
          </UFormField>

          <!-- Price Field -->
          <UFormField name="price" label="Precio" required>
            <UInputNumber
              v-model="serviceState.price"
              placeholder="0.00"
              icon="i-lucide-dollar-sign"
              :step="10"
              :min="0"
              :format-options="{
                style: 'currency',
                currency: 'MXN',
                currencyDisplay: 'narrowSymbol',
              }"
              class="w-full"
            />
          </UFormField>

          <!-- Duration Field -->
          <UFormField name="duration_min" label="Duración (minutos)" required>
            <UInputNumber
              v-model="serviceState.duration_min"
              placeholder="30"
              icon="i-lucide-clock"
              :step="5"
              :min="5"
              class="w-full"
            />
          </UFormField>

          <!-- Active Toggle -->
          <UFormField
            name="is_active"
            label="Estado"
            v-if="isEditing"
            orientation="horizontal"
            class="col-span-2 p-2 mt-1 rounded-lg border border-neutral-300 dark:border-neutral-800 items-center"
          >
            <USwitch
              v-model="serviceState.is_active"
              :label="serviceState.is_active ? 'Activo' : 'Inactivo'"
            />
          </UFormField>
        </UForm>
      </div>
    </template>

    <template #footer="{ close }">
      <div class="flex justify-end gap-3 w-full">
        <UButton
          label="Cancelar"
          color="neutral"
          variant="ghost"
          @click="close"
        />
        <UButton
          :label="isEditing ? 'Guardar Cambios' : 'Crear Servicio'"
          icon="i-lucide-check"
          @click="formRef?.submit()"
        />
      </div>
    </template>
  </UModal>
</template>
