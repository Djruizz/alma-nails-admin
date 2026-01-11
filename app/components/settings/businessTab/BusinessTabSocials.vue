<script setup lang="ts">
const {
  socialLinks,
  hasChanges,
  isCanceling,
  saveSocialLinks,
  deleteSocialLink,
  reset,
} = useBusinessSocials();
const { business } = useBusiness();
</script>
<template>
  <div class="space-y-5">
    <SettingsBusinessTabSocialModal />
    <UFieldGroup v-for="link in socialLinks" :key="link.id" class="w-full">
      <UButton
        :icon="link.icon"
        variant="outline"
        :style="{ color: link.brand_color }"
        class="bg-neutral-50"
      />
      <UInput
        v-model="link.url"
        class="w-full"
        :placeholder="business?.slug || 'url'"
      />
      <UButton
        icon="i-lucide-trash-2"
        color="error"
        variant="outline"
        @click="deleteSocialLink(link.id)"
      />
    </UFieldGroup>
    <SettingsFormActionButtons
      :has-changes="hasChanges"
      :canceling="isCanceling"
      submit-label="Guardar"
      @reset="reset"
      @action="saveSocialLinks"
    />
  </div>
</template>
