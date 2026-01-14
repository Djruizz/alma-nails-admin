<script setup lang="ts">
definePageMeta({
  middleware: "is-owner",
  layout: "admin",
});

const slug = useRoute().params.slug;
</script>

<template>
  <UContainer class="py-8">
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Clientes
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          Gestiona tus clientes y suscripciones
        </p>
      </div>

      <UCard>
        <div class="text-center py-12">
          <UIcon
            name="i-lucide-users"
            class="w-16 h-16 mx-auto text-gray-400 mb-4"
          />
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Próximamente
          </h3>
          <p class="text-gray-500">Esta página está en desarrollo</p>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
