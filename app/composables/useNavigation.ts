import type { NavigationMenuItem } from "@nuxt/ui";

export const useNavigation = () => {
  const route = useRoute();

  // Obtener el slug actual de la ruta
  const currentSlug = computed(() => {
    return (route.params.slug as string) || "";
  });

  // Generar la base de la ruta
  const baseAdminRoute = computed(() => {
    return currentSlug.value ? `/business/${currentSlug.value}/admin` : "/";
  });

  const items = computed<NavigationMenuItem>(() => ({
    dashboard: {
      label: "Inicio",
      to: `${baseAdminRoute.value}/dashboard`,
      icon: "i-lucide-house",
    },
    subscriptions: {
      label: "Clientes",
      to: `${baseAdminRoute.value}/clients`,
      icon: "i-lucide-users",
    },
    analytics: {
      label: "Servicios",
      to: `${baseAdminRoute.value}/services`,
      icon: "i-lucide-sparkles",
    },
    calendar: {
      label: "Agenda",
      to: `${baseAdminRoute.value}/calendar`,
      icon: "i-lucide-calendar",
    },
    settings: {
      label: "Configuración",
      to: `${baseAdminRoute.value}/settings`,
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
    baseAdminRoute,
  };
};
