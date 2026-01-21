import type { NavigationMenuItem } from "@nuxt/ui";

export const useNavigation = () => {
  const route = useRoute();

  // Obtener el slug actual de la ruta
  const currentSlug = computed(() => {
    return (route.params.slug as string) || "";
  });

  // Generar la base de la ruta
  const baseRoute = computed(() => {
    return currentSlug.value ? `/business/${currentSlug.value}` : "/";
  });

  const items = computed<NavigationMenuItem>(() => ({
    dashboard: {
      label: "Inicio",
      to: `${baseRoute.value}/dashboard`,
      icon: "i-lucide-house",
    },
    subscriptions: {
      label: "Clientes",
      to: `${baseRoute.value}/clients`,
      icon: "i-lucide-users",
    },
    analytics: {
      label: "Servicios",
      to: `${baseRoute.value}/services`,
      icon: "i-lucide-sparkles",
    },
    calendar: {
      label: "Agenda",
      to: `${baseRoute.value}/calendar`,
      icon: "i-lucide-calendar",
    },
    settings: {
      label: "Configuración",
      to: `${baseRoute.value}/settings`,
      icon: "i-lucide-settings",
    },
  }));

  const desktopMenu = computed(() => [
    items.value.dashboard,
    items.value.subscriptions,
    items.value.analytics,
    items.value.calendar,
  ]);

  const settingsButton = computed(() => items.value.settings);

  const mobileMenu = computed(() => [
    items.value.subscriptions,
    items.value.analytics,
    items.value.dashboard,
    items.value.calendar,
    items.value.settings,
  ]);

  return {
    desktopMenu,
    mobileMenu,
    settingsButton,
    baseRoute,
  };
};
