import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "shadcn-nuxt",
    "nuxt-og-image",
    "nuxt-shiki",
  ],

  components: [
    { path: "~/components", ignore: ["_internal/*", "_internal/**/*", "examples/*", "examples/**/*"] },
    { path: "~/components/content", global: true, pathPrefix: false },
  ],

  devtools: {
    enabled: true,
  },

  css: [
    "~/assets/css/main.css",
  ],

  content: {
    build: {
      markdown: {
        highlight: false,
      },
    },
    // required to prevent error related to better-sqlite3 during build and deploy
    experimental: {
      sqliteConnector: "native",
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2025-07-15",

  nitro: {
    prerender: {
      crawlLinks: true,
      ignore: [
        "/__og-image__",
      ],
      routes: [
        "/",
        "/docs/getting-started",
        "/docs/components",
        "/templates",
      ],
    },
  },

  vite: {
    plugins: [
      ...tailwindcss(),
    ],
  },

  eslint: {
    config: {
      stylistic: {
        quotes: "double",
        semi: true,
      },
    },
  },

  shadcn: {
    prefix: "",
    componentDir: "./app/components/ui",
  },

  shiki: {
    defaultTheme: {
      light: "github-light-default",
      dark: "github-dark",
    },
    bundledLangs: [
      "ts",
      "tsx",
      "js",
      "vue",
      "html",
      "json",
      "bash",
    ],
  },
});
