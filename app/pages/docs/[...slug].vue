<script lang="ts" setup>
const route = useRoute();

const { data: page } = await useAsyncData(route.path, async () => {
  return await queryCollection("docs").path(route.path).first();
}, {
  default: () => null,
});

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}

const { data: neighbours } = await useAsyncData(`surround-${route.path}`, async () => {
  try {
    return await queryCollectionItemSurroundings("docs", route.path);
  }
  catch {
    return [];
  }
}, {
  default: () => ([]),
});

const previousPage = computed(() => neighbours.value?.[0] ?? null);
const nextPage = computed(() => neighbours.value?.[1] ?? null);
</script>

<template>
  <div
    v-if="page"
    class="flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full"
    data-slot="docs"
  >
    <div class="flex min-w-0 flex-1 flex-col">
      <div class="h-(--top-spacing) shrink-0" />
      <div
        class="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300"
      >
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-2">
            <div class="flex items-start justify-between">
              <h1 class="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                {{ page.title }}
              </h1>

              <div class="docs-nav ml-4 flex items-center gap-2">
                <Button
                  v-if="previousPage"
                  as-child
                  class="extend-touch-target size-8 shadow-none md:size-7"
                  size="icon"
                  variant="secondary"
                >
                  <NuxtLink :to="previousPage.path">
                    <Icon name="tabler:arrow-left" />
                    <span class="sr-only">Previous</span>
                  </NuxtLink>
                </Button>

                <Button
                  v-if="nextPage"
                  as-child
                  class="extend-touch-target size-8 shadow-none md:size-7"
                  size="icon"
                  variant="secondary"
                >
                  <NuxtLink :to="nextPage.path">
                    <span class="sr-only">Next</span>
                    <Icon name="tabler:arrow-right" />
                  </NuxtLink>
                </Button>
              </div>
            </div>
            <p
              v-if="page.description"
              class="text-muted-foreground text-[1.05rem] text-balance sm:text-base"
            >
              {{ page.description }}
            </p>
          </div>
        </div>

        <ContentRenderer
          :value="page"
          class="w-full flex-1 *:data-[slot=alert]:first:mt-0"
        />

        <div
          v-if="previousPage || nextPage"
          class="border-border flex h-16 w-full items-center gap-2 border-t"
        >
          <Button
            v-if="previousPage"
            as-child
            class="max-w-[calc(50%-0.25rem)] shadow-none"
            size="sm"
            variant="secondary"
          >
            <NuxtLink :to="previousPage.path">
              <Icon
                class="size-4"
                name="tabler:arrow-left"
              />
              <span class="truncate">{{ previousPage.title }}</span>
            </NuxtLink>
          </Button>

          <Button
            v-if="nextPage"
            as-child
            class="ml-auto max-w-[calc(50%-0.25rem)] shadow-none"
            size="sm"
            variant="secondary"
          >
            <NuxtLink :to="nextPage.path">
              <span class="truncate">{{ nextPage.title }}</span>
              <Icon
                class="size-4"
                name="tabler:arrow-right"
              />
            </NuxtLink>
          </Button>
        </div>
      </div>
    </div>

    <div
      class="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--header-height)-var(--footer-height))] w-72 flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex"
    >
      <div class="h-(--top-spacing) shrink-0" />
      <div
        v-if="page.body?.toc?.links.length"
        class="no-scrollbar overflow-y-auto px-8"
      >
        <DocsTableOfContents :toc="page.body.toc" />
        <div class="h-12" />
      </div>
    </div>
  </div>
</template>
