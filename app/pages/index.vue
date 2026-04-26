<script lang="ts" setup>
import { ArrowRight, Blocks, MessageSquare, Sparkles } from "lucide-vue-next";
import { siteConfig } from "@/lib/config";

useSeoMeta({
  title: `${siteConfig.name} - Open-source templates and components for Nuxt`,
  description: siteConfig.description,
  ogTitle: `${siteConfig.name} - Open-source templates and components for Nuxt`,
  ogDescription: siteConfig.description,
  ogImage: siteConfig.ogImage,
  ogUrl: siteConfig.url,
  twitterTitle: `${siteConfig.name} - Open-source templates and components for Nuxt`,
  twitterDescription: siteConfig.description,
  twitterImage: siteConfig.ogImage,
  twitterCard: "summary_large_image",
});

const templates = [
  {
    title: "Chat",
    description: "An open chat app starter for Nuxt with practical patterns you can adapt.",
    icon: MessageSquare,
    href: "/templates",
    available: true,
  },
  {
    title: "Dashboard",
    description: "A flexible dashboard starter for building data-heavy Nuxt interfaces. Coming soon.",
    icon: Blocks,
    available: false,
  },
  {
    title: "Starter",
    description: "A minimal Nuxt starter to begin quickly with shadcn-vue. Coming soon.",
    icon: Sparkles,
    available: false,
  },
];
</script>

<template>
  <div>
    <!-- Hero Section -->
    <PageHeader>
      <PageHeaderHeading class="max-w-3xl text-5xl xl:text-6xl">
        Make shadcn-vue easier to use in Nuxt.
      </PageHeaderHeading>
      <PageHeaderDescription class="mt-4">
        An open-source effort for the shadcn-vue community.
        Use templates to get started quickly, then extend with reusable components.
      </PageHeaderDescription>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button
          as-child
          size="lg"
        >
          <NuxtLink to="/templates">
            Browse Templates
            <ArrowRight class="size-4" />
          </NuxtLink>
        </Button>
        <Button
          as-child
          variant="outline"
          size="lg"
        >
          <NuxtLink to="/docs/components">
            View Components
          </NuxtLink>
        </Button>
      </div>
    </PageHeader>

    <!-- Templates Section -->
    <section class="border-grid border-t">
      <div class="container-wrapper">
        <div class="container py-12 md:py-16 lg:py-20">
          <div class="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <h2 class="text-primary text-3xl font-semibold tracking-tight lg:text-4xl">
              Templates
            </h2>
            <p class="text-muted-foreground mt-3 text-base text-balance sm:text-lg">
              Open templates you can use, learn from, and adapt for your Nuxt projects.
            </p>
          </div>
          <div class="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            <div
              v-for="template in templates"
              :key="template.title"
              class="border-border bg-card text-card-foreground rounded-lg border p-6 transition-colors"
              :class="template.available ? 'hover:border-foreground/20' : 'opacity-60'"
            >
              <div class="mb-4 flex items-center gap-3">
                <div class="bg-muted flex size-10 items-center justify-center rounded-md">
                  <component
                    :is="template.icon"
                    class="text-foreground size-5"
                  />
                </div>
                <h3 class="text-foreground text-lg font-semibold">
                  {{ template.title }}
                </h3>
              </div>
              <p class="text-muted-foreground mb-4 text-sm leading-relaxed">
                {{ template.description }}
              </p>
              <NuxtLink
                v-if="template.available && template.href"
                :to="template.href"
                class="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
              >
                Learn more
                <ArrowRight class="size-3" />
              </NuxtLink>
              <span
                v-else
                class="text-muted-foreground text-sm"
              >
                Coming soon
              </span>
            </div>
          </div>
          <div class="mt-10 text-center">
            <NuxtLink
              to="/templates"
              class="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
            >
              View all templates
              <ArrowRight class="size-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Components Section -->
    <section class="border-grid border-t">
      <div class="container-wrapper">
        <div class="container py-12 md:py-16 lg:py-20">
          <div class="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <h2 class="text-primary text-3xl font-semibold tracking-tight lg:text-4xl">
              Components
            </h2>
            <p class="text-muted-foreground mt-3 text-base text-balance sm:text-lg">
              Reusable building blocks that complement templates and help fill practical gaps.
            </p>
          </div>
          <div class="text-center">
            <Button
              as-child
              variant="outline"
              size="lg"
            >
              <NuxtLink to="/docs/components">
                Browse Components
                <ArrowRight class="size-4" />
              </NuxtLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
