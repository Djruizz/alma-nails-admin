<script setup lang="ts">
const { addSocialLink } = useBusinessSocials();
</script>

<template>
  <UModal title="Redes Sociales" description="Agregar Red Social">
    <UButton
      icon="i-lucide-plus"
      variant="outline"
      label="Agregar Red Social"
    />
    <template #body="{ close }">
      <div class="flex flex-col gap-2 overflow-y-auto h-[250px]">
        <UButton
          v-for="network in SOCIAL_NETWORKS"
          :key="network.key"
          variant="outline"
          color="neutral"
          :label="network.name"
          @click="
            addSocialLink(network);
            close();
          "
        >
          <template #leading>
            <div
              class="bg-neutral-50 rounded-xl p-2 flex items-center justify-center"
            >
              <UIcon
                :name="network.icon"
                :style="{ color: network.brand_color }"
                class="size-5"
              />
            </div>
          </template>
        </UButton>
      </div>
    </template>
    <template #footer="{ close }">
      <UButton
        color="neutral"
        variant="outline"
        label="Cancelar"
        class="ms-auto"
        @click="close"
      />
    </template>
  </UModal>
</template>
