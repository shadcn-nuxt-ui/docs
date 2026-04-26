# Shadcn Nuxt UI

Open-source templates and reusable components for Nuxt with shadcn-vue.

This project aims to make shadcn-vue easier to use in Nuxt by providing:

- practical templates you can start from,
- reusable components you can install independently,
- documentation that connects both paths clearly.

## What this repository includes

- **Docs site** (Nuxt 4 + Nuxt Content)
- **shadcn-vue registry output** under `public/r/*.json`
- **Template and component documentation** under `content/docs`

## Use the registry

Install an item with the shadcn-vue CLI:

```bash
npx shadcn-vue@latest add "https://shadcn-nuxt-ui.stackhacker.io/r/lucide-icon.json"
```

## Local development

Install dependencies:

```bash
pnpm install
```

Start the docs site:

```bash
pnpm dev
```

## Quality checks

```bash
pnpm lint
pnpm typecheck
```

## Build registry files

```bash
pnpm registry:build
```

This command generates distributable registry JSON files in `public/r/`.
