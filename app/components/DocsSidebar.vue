<script lang="ts" setup>
import type { ContentNavigationItem } from "@nuxt/content";
import { cn } from "~/lib/utils";

defineProps<{
  tree: ContentNavigationItem;
  pathname: string;
}>();
</script>

<template>
  <Sidebar
    class="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--footer-height)-4rem)] bg-transparent lg:flex"
    collapsible="none"
  >
    <SidebarContent class="no-scrollbar overflow-x-hidden px-2">
      <div
        class="from-background via-background/80 to-background/50 sticky -top-1 z-10 h-8 shrink-0 bg-gradient-to-b blur-xs"
      />
      <template v-if="tree.children">
        <div
          v-for="item in tree.children"
          :key="item.stem"
          class="flex flex-col gap-1 py-2"
        >
          <template v-if="item.children?.length">
            <p class="text-muted-foreground px-2 text-xs font-semibold tracking-wide uppercase">
              {{ item.title }}
            </p>

            <ul class="mt-1 flex flex-col gap-1">
              <li
                v-for="subItem in item.children"
                :key="subItem.path"
              >
                <NuxtLink
                  :class="cn(
                    'text-foreground flex min-h-8 items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                    pathname === subItem.path
                      ? 'bg-sidebar-accent text-primary font-medium'
                      : 'hover:bg-sidebar-accent hover:text-primary',
                  )"
                  :to="subItem.path"
                >
                  {{ subItem.title }}
                </NuxtLink>
              </li>
            </ul>
          </template>

          <NuxtLink
            v-else
            :class="cn(
              'text-foreground flex min-h-8 items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
              pathname === item.path
                ? 'bg-sidebar-accent text-primary font-medium'
                : 'hover:bg-sidebar-accent hover:text-primary',
            )"
            :to="item.path"
          >
            <template v-if="item.icon">
              <Icon :name="item.icon as string" />
            </template>
            {{ item.title }}
          </NuxtLink>
        </div>
      </template>
    </SidebarContent>
  </Sidebar>
</template>
