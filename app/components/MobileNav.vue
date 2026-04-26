<script lang="ts" setup>
import type { ContentNavigationItem } from "@nuxt/content";
import type { HTMLAttributes } from "vue";
import { sectionCategories } from "~/composables/useNavigation";
import { cn } from "~/lib/utils";

type NavItem = {
  href: string;
  label: string;
};

const props = defineProps<{
  class?: HTMLAttributes["class"];
  items: NavItem[];
}>();

const route = useRoute();
const open = ref(false);

const { data: navigation } = await useAsyncData("mobile-docs-navigation", async () => {
  try {
    return await queryCollectionNavigation("docs");
  }
  catch {
    return [];
  }
}, {
  default: () => ([]),
});

const { data: pages } = await useAsyncData("mobile-docs-page-meta", async () => {
  try {
    return await queryCollection("docs")
      .select("path", "category" as never)
      .all();
  }
  catch {
    return [];
  }
}, {
  default: () => ([]),
});

const categoryByPath = computed(() => {
  const map = new Map<string, string>();
  for (const page of pages.value ?? []) {
    const p = page as { path: string; category?: string };
    if (p.category) {
      map.set(p.path, p.category);
    }
  }
  return map;
});

const docsRoot = computed(() => {
  return navigation.value?.find(item => item.stem === "docs") ?? null;
});

const overviewLinks = computed(() => {
  const section = docsRoot.value?.children?.find(item => item.path === "/docs/getting-started");
  return section?.children ?? [];
});

const componentGroups = computed(() => {
  const section = docsRoot.value?.children?.find(item => item.path === "/docs/components");
  const children = section?.children ?? [];
  const definitions = sectionCategories.components ?? [];

  const groups = new Map<string, ContentNavigationItem[]>();
  const uncategorized: ContentNavigationItem[] = [];

  for (const child of children) {
    const category = categoryByPath.value.get(child.path!);
    if (!category) {
      uncategorized.push(child);
      continue;
    }

    if (!groups.has(category)) {
      groups.set(category, []);
    }

    groups.get(category)!.push(child);
  }

  const result: { id: string; title: string; links: ContentNavigationItem[] }[] = [];

  for (const definition of definitions) {
    const links = groups.get(definition.id);
    if (links?.length) {
      result.push({ id: definition.id, title: definition.title, links });
    }
  }

  if (uncategorized.length) {
    result.push({ id: "other", title: "Other", links: uncategorized });
  }

  return result;
});

const isActive = (path: string) => route.path === path;

const closeMenu = () => {
  open.value = false;
};
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger as-child>
      <Button
        variant="ghost"
        :class="cn('h-8 gap-2 px-0 text-xl hover:bg-transparent', props.class)"
      >
        <Icon name="tabler:menu-2" />
        <span class="font-medium">Menu</span>
      </Button>
    </SheetTrigger>

    <SheetContent
      side="left"
      class="w-full max-w-none p-0 sm:max-w-none"
    >
      <div class="no-scrollbar h-full overflow-y-auto px-6 py-6">
        <div class="space-y-8">
          <section class="space-y-4">
            <p class="text-muted-foreground text-sm font-medium">
              Menu
            </p>
            <div class="flex flex-col gap-3">
              <NuxtLink
                class="text-xl font-medium"
                to="/"
                @click="closeMenu"
              >
                Home
              </NuxtLink>
              <NuxtLink
                v-for="item in items"
                :key="item.href"
                :class="cn('text-xl font-medium', isActive(item.href) && 'text-primary')"
                :to="item.href"
                @click="closeMenu"
              >
                {{ item.label }}
              </NuxtLink>
            </div>
          </section>

          <section class="space-y-4">
            <p class="text-muted-foreground text-sm font-medium">
              Docs
            </p>

            <div class="space-y-4">
              <div class="space-y-3">
                <p class="text-muted-foreground text-sm font-medium">
                  Getting Started
                </p>
                <div class="flex flex-col gap-2">
                  <NuxtLink
                    v-for="item in overviewLinks"
                    :key="item.path"
                    :class="cn('text-lg font-medium', isActive(item.path || '') && 'text-primary')"
                    :to="item.path || '/docs/getting-started'"
                    @click="closeMenu"
                  >
                    {{ item.title }}
                  </NuxtLink>
                </div>
              </div>

              <div class="space-y-3">
                <p class="text-muted-foreground text-sm font-medium">
                  Components
                </p>
                <div class="space-y-3">
                  <div
                    v-for="group in componentGroups"
                    :key="group.id"
                    class="space-y-2"
                  >
                    <p class="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                      {{ group.title }}
                    </p>
                    <div class="flex flex-col gap-2">
                      <NuxtLink
                        v-for="item in group.links"
                        :key="item.path"
                        :class="cn('text-base font-medium', isActive(item.path || '') && 'text-primary')"
                        :to="item.path || '/docs/components'"
                        @click="closeMenu"
                      >
                        {{ item.title }}
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>
