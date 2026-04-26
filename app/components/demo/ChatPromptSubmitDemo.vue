<script setup lang="ts">
import { ChatPromptSubmit } from "~/registry/blocks/chat-prompt-submit";

const statuses = ["ready", "streaming", "submitted", "error"] as const;
</script>

<template>
  <div class="flex items-center gap-4">
    <div
      v-for="status in statuses"
      :key="status"
      class="flex flex-col items-center gap-2"
    >
      <ChatPromptSubmit :status="status" />
      <span class="text-xs text-muted-foreground">{{ status }}</span>
    </div>
  </div>
</template>
