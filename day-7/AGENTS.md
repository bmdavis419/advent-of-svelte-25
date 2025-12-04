# AGENTS.md

## Build/Test Commands

- `bun run check` - Type check with svelte-check
- `bun run lint` - Check formatting (Prettier)
- `bun run format` - Auto-format code

## Code Style

- **Formatting**: Tabs, single quotes, no trailing commas, 100 char width (Prettier)
- **Imports**: Package imports first, then `$lib/*` aliases, then relative imports
- **Types**: TypeScript strict mode; use `lang="ts"` in Svelte `<script>` tags; avoid explicit return types unless absolutely necessary
- **Naming**: camelCase for variables/functions, kebab-case for CSS classes
- **Styles**: Tailwind CSS v4, only use css as a last resort

## Svelte 5 Patterns

- Use runes: `$props()`, `$state()`, `$derived()`, `$effect()`
- Use `{@render children()}` for slots, not `<slot>`
- Follow SvelteKit routing: `+page.svelte`, `+layout.svelte`, `+server.ts`

## Tech Stack

- SvelteKit 2 + Svelte 5, TypeScript, Vite 7, Tailwind CSS v4, Bun

## Up to date svelte knowledge

This project uses `btca` CLI to fetch current Svelte documentation. Use it when:

- Working with newer/experimental Svelte 5 features (remote functions, async components, etc.)
- Unsure about the correct API or syntax for a specific feature
- The user asks about something that may have changed recently

Do NOT use it for basic Svelte patterns you already know (runes, routing, components).

```bash
btca ask -t svelte -q 'How do remote functions work with query and form?'
```

Be specific with your query - include the exact feature or problem you need help with.
