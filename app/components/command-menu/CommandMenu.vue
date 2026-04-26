<template>
  <Button
    :class="cn(
      'bg-surface text-foreground dark:bg-card relative h-8 w-full justify-start pl-3 font-medium shadow-none sm:pr-12 md:w-48 lg:w-56 xl:w-64',
    )"
    variant="secondary"
    @click="openCommandMenu"
  >
    <span class="hidden lg:inline-flex">Search documentation...</span>
    <span class="inline-flex lg:hidden">Search...</span>
    <div class="absolute top-1.5 right-1.5 hidden gap-1 sm:flex">
      <KbdGroup>
        <Kbd class="border">{{ shortcutKeyLabel }}</Kbd>
        <Kbd class="border">K</Kbd>
      </KbdGroup>
    </div>
  </Button>

  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[100] bg-black/50 px-4"
      @click.self="open = false"
    >
      <div
        class="bg-background border-border mx-auto mt-[12vh] w-full max-w-2xl rounded-xl border shadow-2xl"
      >
        <div class="border-border border-b p-3">
          <Input
            id="command-menu-search-input"
            v-model="searchQuery"
            autocomplete="off"
            autofocus
            placeholder="Search documentation..."
            @keydown.enter.prevent="navigateToSelected"
          />
        </div>

        <div class="max-h-[60vh] overflow-y-auto p-2">
          <p
            v-if="!filteredDocs.length"
            class="text-muted-foreground px-2 py-4 text-sm"
          >
            No results found.
          </p>

          <button
            v-for="(item, index) in filteredDocs"
            v-else
            :key="item.path"
            type="button"
            :class="cn(
              'hover:bg-muted w-full rounded-md border border-transparent px-3 py-2 text-left transition-colors',
              selectedIndex === index && 'bg-muted border-border',
            )"
            @click="navigateToPath(item.path)"
            @mouseenter="selectedIndex = index"
          >
            <div class="text-foreground text-sm font-medium">
              {{ item.title }}
            </div>
            <p
              v-if="item.description"
              class="text-muted-foreground mt-1 line-clamp-2 text-xs"
            >
              {{ item.description }}
            </p>
            <p class="text-muted-foreground mt-1 text-xs">
              {{ item.path }}
            </p>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { cn } from "~/lib/utils";
import { useIsMac } from "~/composables/useIsMac";

interface DocSearchItem {
  path: string;
  title: string;
  description?: string;
}

const isMac = useIsMac();
const shortcutKeyLabel = computed(() => {
  if (isMac.value === null) {
    return "⌘/Ctrl";
  }

  return isMac.value ? "⌘" : "Ctrl";
});

const open = ref(false);
const searchQuery = ref("");
const selectedIndex = ref(0);
const route = useRoute();

const { data: docs } = await useAsyncData<DocSearchItem[]>("command-menu-docs", async () => {
  try {
    return await queryCollection("docs")
      .select("path", "title", "description")
      .where("path", "LIKE", "/docs/%")
      .order("title", "ASC")
      .all();
  }
  catch {
    return [];
  }
}, {
  default: () => ([]),
});

const searchableDocs = computed(() => {
  return docs.value.filter(item => ["/docs/components", "/docs/getting-started"].some(prefix => item.path.startsWith(prefix)));
});

const filteredDocs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return searchableDocs.value;
  }

  return searchableDocs.value.filter((item) => {
    const title = item.title.toLowerCase();
    const description = item.description?.toLowerCase() ?? "";
    const path = item.path.toLowerCase();

    return [title, description, path].some(value => value.includes(query));
  });
});

const openCommandMenu = () => {
  open.value = true;
};

const toggleCommandMenu = () => {
  open.value = !open.value;
};

const navigateToPath = async (path: string) => {
  open.value = false;
  await navigateTo(path);
};

const navigateToSelected = async () => {
  const selectedDoc = filteredDocs.value[selectedIndex.value] ?? filteredDocs.value[0];

  if (selectedDoc) {
    await navigateToPath(selectedDoc.path);
  }
};

watch(open, async (isOpen) => {
  if (isOpen) {
    await nextTick();
    const input = document.getElementById("command-menu-search-input") as HTMLInputElement | null;
    input?.focus();
    input?.select();
    return;
  }

  searchQuery.value = "";
  selectedIndex.value = 0;
});

watch(filteredDocs, (items) => {
  if (!items.length) {
    selectedIndex.value = 0;
    return;
  }

  if (selectedIndex.value >= items.length) {
    selectedIndex.value = 0;
  }
});

watch(() => route.path, () => {
  open.value = false;
});

onKeyStroke(["k", "K"], (e: KeyboardEvent) => {
  if (e.metaKey || e.ctrlKey) {
    e.preventDefault();
    toggleCommandMenu();
  }
});

onKeyStroke("Escape", () => {
  if (open.value) {
    open.value = false;
  }
});

onKeyStroke("ArrowDown", (e: KeyboardEvent) => {
  if (!open.value || !filteredDocs.value.length) {
    return;
  }

  e.preventDefault();
  selectedIndex.value = (selectedIndex.value + 1) % filteredDocs.value.length;
});

onKeyStroke("ArrowUp", (e: KeyboardEvent) => {
  if (!open.value || !filteredDocs.value.length) {
    return;
  }

  e.preventDefault();
  selectedIndex.value = (selectedIndex.value - 1 + filteredDocs.value.length) % filteredDocs.value.length;
});

onKeyStroke("Enter", async (e: KeyboardEvent) => {
  if (open.value) {
    e.preventDefault();
    await navigateToSelected();
  }
});
</script>
