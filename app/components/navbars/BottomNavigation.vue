<script setup lang="ts">
const route = useRoute();
const { mobileMenu } = useNavigation();

const isActive = (path: string) => {
  // Normalizar las rutas para comparación
  const currentPath = route.path;

  // Si el path del item es exactamente igual a la ruta actual
  if (currentPath === path) {
    return true;
  }

  // Si el item apunta a la raíz del negocio y estamos en esa ruta exacta
  if (path.endsWith(`/business/${route.params.slug}`) && currentPath === path) {
    return true;
  }

  // Para otras rutas, verificar si la ruta actual comienza con el path del item
  // Pero solo si no es la ruta raíz del negocio
  if (
    !path.endsWith(`/business/${route.params.slug}`) &&
    currentPath.startsWith(path)
  ) {
    return true;
  }

  return false;
};

const activeIndex = computed(() => {
  return mobileMenu.value.findIndex((i) => isActive(i.to));
});

const left = computed(
  () =>
    `calc(
    (${activeIndex.value} * (100% / ${mobileMenu.value.length}))
    + ((100% / ${mobileMenu.value.length} - (100% / ${mobileMenu.value.length} * 0.1)) / 2)
  )`
);

const width = computed(() => `calc(100% / ${mobileMenu.value.length} *0.1)`);
</script>
<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 z-50 border h-16 m-5 rounded-xl"
  >
    <div class="relative w-full z-10 h-full flex justify-around items-center">
      <div
        class="absolute bottom-2 z-0 h-1 rounded-full bg-primary transition-[left] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        :style="{
          width: width,
          left: left,
        }"
      />
      <UButton
        v-for="item in mobileMenu"
        class="rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        :class="isActive(item.to) ? '-translate-y-1 scale-105' : ''"
        :color="isActive(item.to) ? 'primary' : 'neutral'"
        :variant="isActive(item.to) ? 'soft' : 'ghost'"
        :icon="item.icon"
        :to="item.to"
        size="xl"
      ></UButton>
    </div>
  </nav>
</template>
