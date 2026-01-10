<script setup lang="ts">
const client = useSupabaseClient();
const { business } = useBusiness();
const businessSocials = ref<BusinessSocial[]>([]);
const getBusinessSocials = async () => {
  if (!business.value) return;
  const { data } = await client
    .from("business_socials")
    .select(
      `
    *,
    social_networks (
      name,
      icon,
      brand_color
    )
  `
    )
    .eq("business_id", business.value.id)
    .order("position");
  if (!data) return;
  businessSocials.value = data as BusinessSocial[];
};
onMounted(() => {
  getBusinessSocials();
});
const normalizedSocials = computed(
  () =>
    businessSocials.value?.map((item) => ({
      ...item,
      name: item.social_networks?.name ?? item.custom_name ?? "Red social",
      icon: item.social_networks?.icon ?? item.custom_icon ?? "i-lucide-link",
      color: item.social_networks?.brand_color ?? undefined,
    })) ?? []
);

const loadingNetworks = ref(false);
const networks = ref<SocialNetworkLite[]>([]);
const selectedNetwork = ref();
const getNetworks = async () => {
  loadingNetworks.value = true;
  if (networks.value.length > 0) {
    loadingNetworks.value = false;
    return;
  }
  try {
    const { data, error } = await client
      .from("social_networks")
      .select("id, name, icon, base_url")
      .eq("is_active", true)
      .order("name");
    if (error) throw error;
    networks.value = data;
  } finally {
    loadingNetworks.value = false;
  }
};
const items = computed(() => {
  return networks.value.map((network) => ({
    label: network.name,
    icon: network.icon,
    description: network.base_url ?? "",
    value: network.id,
  }));
});
const customUrl = ref<string>("");

const selectedNetworkData = computed(() => {
  if (selectedNetwork.value) {
    return networks.value.find((n) => n.id === selectedNetwork.value);
  }
  return null;
});

const finalUrl = computed(() => {
  if (selectedNetworkData.value?.base_url && customUrl.value) {
    return `${selectedNetworkData.value.base_url}${customUrl.value}`;
  }
  return "";
});
</script>
<template>
  <div class="space-y-5">
    <UFieldGroup
      v-for="link in normalizedSocials"
      :key="link.id"
      class="w-full"
    >
      <UButton :icon="link.icon" variant="outline" :label="link.name" />
      <UInput v-model="link.url" class="w-full" />
      <UButton icon="i-lucide-trash-2" color="error" variant="outline" />
    </UFieldGroup>

    <UModal :ui="{ footer: 'flex flex-col gap-2' }">
      <UButton label="Añadir red social" @click="getNetworks" />
      <template #title> Redes Sociales </template>
      <template #body>
        <div
          v-if="loadingNetworks"
          class="h-50 flex items-center justify-center"
        >
          <UIcon
            name="i-heroicons-arrow-path"
            class="w-8 h-8 animate-spin text-primary"
          />
        </div>
        <div v-else>
          <URadioGroup
            v-model="selectedNetwork"
            :items="items"
            color="neutral"
            variant="card"
          >
            <template #label="{ item }">
              <div class="flex items-center gap-2">
                <UIcon :name="item.icon" />
                <p>{{ item.label }}</p>
              </div>
            </template>
          </URadioGroup>
        </div>
      </template>
      <template #footer="{ close }">
        <UFieldGroup class="w-full">
          <UBadge size="lg" variant="outline" color="neutral">
            {{ selectedNetworkData?.base_url }}
          </UBadge>
          <UInput
            v-model="customUrl"
            :placeholder="business?.name"
            class="w-full"
          />
        </UFieldGroup>
        <div class="flex justify-end gap-2 w-full">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="outline"
            @click="close"
          />
          <UButton label="Añadir" @click="" />
        </div>
      </template>
    </UModal>
  </div>
</template>
