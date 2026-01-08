// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  modules: ["@nuxtjs/supabase", "@nuxt/ui"],
  css: ["@/assets/css/main.css"],
  imports: {
    dirs: ["@@/shared/schemas", "@@/shared/types", "composables/auth"],
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: "/login",
      callback: "/dashboard",
    },
    types: "@@/shared/types/database.types.ts",
  },
});
