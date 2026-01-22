// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  modules: ["@nuxtjs/supabase", "@nuxt/ui"],
  css: ["@/assets/css/main.css"],
  imports: {
    dirs: [
      "@@/shared/schemas",
      "@@/shared/types",
      "@@/shared/utils",
      "composables/auth",
      "composables/settings",
      "composables/services",
      "composables/clients",
    ],
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false, // Desactivar redirect automático para manejarlo manualmente
    redirectOptions: {
      login: "/login",
      callback: "/",
      exclude: ["/", "/login"], // Rutas que no requieren autenticación
    },
    types: "@@/shared/types/database.types.ts",
  },
});
