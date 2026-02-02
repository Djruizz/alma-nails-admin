<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
const { sortByItems, checkedIconStyle, applyFilters } = useSortBy();
</script>
<template>
  <UDropdownMenu
    :items="sortByItems"
    arrow
    checked-icon="i-lucide-arrow-up"
    :ui="{
      content: 'w-50',
      itemTrailingIcon: [
        checkedIconStyle,
        'transition-transform duration-150 ease-in-out',
      ],
    }"
  >
    <UButton icon="i-lucide-arrow-up-down" variant="subtle" color="neutral">
      <span class="hidden sm:block">Ordenar por</span>
    </UButton>
    <template #status="{ item }: { item: DropdownMenuItem }">
      <div class="flex justify-between gap-2 w-full">
        <div class="flex items-center gap-2">
          <UIcon :name="item.icon" size="1.2rem" />
          <p>{{ item.label }}</p>
        </div>
        <UIcon v-if="item.checked" name="i-lucide-check" size="1.2rem" />
      </div>
    </template>
    <template #apply-actions>
      <UButton
        label="Aplicar"
        color="primary"
        variant="subtle"
        class="mx-auto px-5"
        @click="applyFilters()"
      />
    </template>
  </UDropdownMenu>
</template>
