<script lang="ts" setup>
import { sectionCategories } from "~/composables/useNavigation";

type ComponentDoc = {
  path: string;
  title: string;
  description?: string;
  category?: string;
};

const { data: pages } = await useAsyncData("components-index-pages", async () => {
  try {
    return await queryCollection("docs")
      .where("path", "LIKE", "/docs/components/%")
      .select("path", "title", "description", "category" as never)
      .order("title", "ASC")
      .all();
  }
  catch {
    return [];
  }
}, {
  default: () => ([]),
});

const categories = sectionCategories.components;

const grouped = computed(() => {
  const items = (pages.value ?? []) as ComponentDoc[];
  const groups = new Map<string, ComponentDoc[]>();
  const uncategorized: ComponentDoc[] = [];

  for (const item of items) {
    if (item.category) {
      if (!groups.has(item.category)) {
        groups.set(item.category, []);
      }
      groups.get(item.category)!.push(item);
      continue;
    }

    uncategorized.push(item);
  }

  const result: { title: string; items: ComponentDoc[] }[] = [];
  for (const { id, title } of categories ?? []) {
    const groupItems = groups.get(id);
    if (groupItems?.length) {
      result.push({ title, items: groupItems });
    }
  }

  if (uncategorized.length) {
    result.push({ title: "Other", items: uncategorized });
  }

  return result;
});
</script>

<template>
  <Separator />

  <div class="mt-8 space-y-8">
    <div
      v-for="group in grouped"
      :key="group.title"
      class="flex flex-col gap-4"
    >
      <h2 class="text-lg font-semibold tracking-tight">
        {{ group.title }}
      </h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="item in group.items"
          :key="item.path"
          :to="item.path"
          class="border-border hover:border-foreground/20 group flex flex-col gap-2 rounded-lg border p-4 transition-colors"
        >
          <span class="text-foreground text-sm font-medium group-hover:underline">
            {{ item.title }}
          </span>
          <span
            v-if="item.description"
            class="text-muted-foreground line-clamp-2 text-xs"
          >
            {{ item.description }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
