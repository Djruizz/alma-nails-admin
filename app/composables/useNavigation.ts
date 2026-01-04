import type { NavigationMenuItem } from "@nuxt/ui";
export const useNavigation = () => {
  const items: NavigationMenuItem = {
    dashboard: {
      label: "Inicio",
      to: "/",
      icon: "i-lucide-house",
    },
    subscriptions: {
      label: "Clientes",
      to: "/clients",
      icon: "i-lucide-users",
    },
    analytics: {
      label: "Servicios",
      to: "/services",
      icon: "i-lucide-sparkles",
    },
    calendar: {
      label: "Agenda",
      to: "/calendar",
      icon: "i-lucide-calendar",
    },
    settings: {
      label: "Configuración",
      to: "/settings",
      icon: "i-lucide-settings",
    },
  };

  const desktopMenu = [
    items.dashboard,
    items.subscriptions,
    items.analytics,
    items.calendar,
  ];

  const settingsButton = items.settings;

  const mobileMenu = [
    items.subscriptions,
    items.analytics,
    items.dashboard,
    items.calendar,
    items.settings, 
  ];

  return {
    desktopMenu,
    mobileMenu,
    settingsButton,
  };
};