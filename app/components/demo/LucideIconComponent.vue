<script setup lang="ts">
import { Heart } from "lucide-vue-next";
import { LucideIcon } from "~/registry/ui/lucide-icon";
</script>

<template>
  <div class="flex items-center gap-4">
    <LucideIcon
      :name="Heart"
      class="size-6"
    />
  </div>
</template>
