<script setup lang="ts">
import { ChatPrompt } from "~/registry/blocks/chat-prompt";
import { ChatPromptSubmit } from "~/registry/blocks/chat-prompt-submit";

const input = ref("");

function onSubmit() {
  input.value = "";
}
</script>

<template>
  <div class="w-full max-w-xl">
    <ChatPrompt
      v-model="input"
      @submit="onSubmit"
    >
      <template #footer>
        <span />
        <ChatPromptSubmit :disabled="!input.trim()" />
      </template>
    </ChatPrompt>
  </div>
</template>
