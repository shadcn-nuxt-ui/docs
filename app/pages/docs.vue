<script lang="ts" setup>
import { useNavigation, useGroupedNavigation } from "~/composables/useNavigation";

const route = useRoute();
const pathname = computed(() => route.path);
const { data } = await useNavigation();

const section = computed(() => route.path.split("/")[2] ?? "");
const { grouped } = await useGroupedNavigation(data, section);

const fallbackTree = computed(() => ({
  title: "Docs",
  path: "/docs",
  stem: "docs",
  children: [],
}));

const tree = computed(() => grouped.value ?? fallbackTree.value);
</script>

<template>
  <div class="container-wrapper flex flex-1 flex-col px-2">
    <SidebarProvider
      class="3xl:fixed:container 3xl:fixed:px-3 min-h-min flex-1 items-start px-0 [--sidebar-width:220px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:240px] lg:[--top-spacing:calc(var(--spacing)*4)]"
    >
      <DocsSidebar
        :pathname="pathname"
        :tree="tree"
      />
      <div class="h-full w-full">
        <NuxtPage />
      </div>
    </SidebarProvider>
  </div>
</template>
