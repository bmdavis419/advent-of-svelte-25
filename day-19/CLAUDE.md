# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

ALWAYS USE BUN.

- `bun run check` - Type check with svelte-check
- `bun run format` - Format code with Prettier
- `bun run lint` - Check formatting

## Tech Stack

- **Svelte 5** with runes (`$state`, `$derived`, `$effect`, etc.)
- **SvelteKit 2** for routing and SSR
- **Tailwind CSS 4** via Vite plugin (use `@import "tailwindcss"` in CSS)
- **TypeScript**

## Project Structure

Standard SvelteKit structure:

- `src/routes/` - Page routes (+page.svelte, +layout.svelte, +server.ts, etc.)
- `src/lib/` - Shared components and utilities (import via `$lib/`)
- `static/` - Static assets

## Svelte MCP Server

You have access to the Svelte MCP server with these tools:

1. **list-sections** - Use FIRST to discover available Svelte 5/SvelteKit documentation
2. **get-documentation** - Fetch documentation for specific sections
3. **svelte-autofixer** - MUST use when writing Svelte code to check for issues
4. **playground-link** - Generate playground links (ask user first, never use if writing to files)
