/**
 * Registry configuration for stackhacker-ui
 *
 * This file defines the configuration options for generating registry.json files.
 * Customize the settings below to match your project structure.
 */

import { defineConfig } from "shadcn-vue-registry";

export default defineConfig({
  root: ".",
  name: "stackhacker-ui",
  homepage: "https://ui.stackhacker.io",
  cwd: "./app/registry",
});
