/**
 * Registry configuration for shadcn-nuxt-ui
 *
 * This file defines the configuration options for generating registry.json files.
 * Customize the settings below to match your project structure.
 */

import { defineConfig } from "shadcn-vue-registry";

export default defineConfig({
  root: ".",
  name: "shadcn-nuxt-ui",
  homepage: "https://shadcn-nuxt-ui.stackhacker.io",
  cwd: "./app/registry",
});
