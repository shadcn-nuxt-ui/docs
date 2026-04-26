<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

const props = withDefaults(defineProps<{
  name: string;
  description?: string;
  align?: "center" | "start" | "end";
  class?: HTMLAttributes["class"];
}>(), {
  align: "center",
});

const Component = defineAsyncComponent({
  loader: () => import(`~/components/demo/${props.name}.vue`),
});

const source = computedAsync(async () => {
  try {
    const mod = await import(`~/components/demo/${props.name}.vue?raw`);
    return mod.default;
  }
  catch {
    return null;
  }
});
</script>

<template>
  <div
    :class="cn(
      'group relative mt-4 mb-12 flex flex-col rounded-lg border',
      props.class,
    )"
  >
    <div
      :data-align="align"
      :class="cn(
        'preview flex w-full justify-center p-10 min-h-[200px]',
        'data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start',
      )"
    >
      <component :is="Component" />
    </div>

    <div
      v-if="source"
      class="overflow-hidden [&_[data-pretty-code-figure]]:!m-0 [&_[data-pretty-code-figure]]:rounded-t-none [&_[data-pretty-code-figure]]:border-t [&_pre]:max-h-[400px]"
    >
      <ProsePre
        :code="source"
        language="vue"
      />
    </div>
  </div>
</template>
