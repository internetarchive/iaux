# CLAUDE.md

Project summary for Claude Code context.

## What This Is

Internet Archive TypeScript WebComponent Template — a starter template for building Lit-based web components published to `@internetarchive/your-webcomponent`. Licensed AGPL-3.0.

## Tech Stack

- **Lit** (v2/v3) web components with TypeScript decorators
- **Vite** for dev server (`npm start`) and library builds (`npm run build`)
- **Vitest** + **Playwright** (Chromium) for browser-based unit tests
- **axe-core** for accessibility auditing in every test
- **ESLint v10** (flat config) + **Prettier** (single quotes, no arrow parens)
- **Husky** pre-commit hook runs lint-staged (eslint + prettier on `*.ts`)

## Project Layout

```
index.ts              → Library entry point, re-exports from src/
src/                  → Component source code
test/                 → Tests and fixture helper
demo/                 → Dev server demo app (app-root.ts + index.html)
dist/                 → Built library output (published to npm)
ghpages/              → GitHub Pages build output
.github/workflows/    → CI (ci.yml), main deploy (gh-pages-main.yml), PR preview (pr-preview.yml)
vite.config.ts          → Vite library build config (default)
vitest.config.ts        → Vitest browser test config
vite.ghpages.config.ts  → GitHub Pages demo build config
tsconfig.json         → Strict TS, esnext target, bundler resolution, decorators
tsconfig.build.json   → Declaration-only emit for dist types
eslint.config.mjs     → ESLint flat config with typescript-eslint
```

## Key Commands

| Command | What it does |
|---------|-------------|
| `npm start` | Vite dev server for the demo |
| `npm test` | Lint → circular dep check → vitest with coverage |
| `npm run test:watch` | Vitest in watch mode |
| `npm run build` | Build library to `dist/` |
| `npm run lint` | ESLint + Prettier check |
| `npm run format` | Auto-fix lint/format issues |
| `npm run ghpages:build` | Build demo for GitHub Pages |

## Code Patterns

- Components use `@customElement('tag-name')` and `@property()` decorators
- `useDefineForClassFields: false` in tsconfig (required for Lit decorators)
- Styles use `static styles = css\`...\`` with CSS custom properties for theming
- Custom events dispatched via `new CustomEvent(name, { detail })` with an enum for event names
- Tests use a `fixture<T>(html\`...\`)` helper from `test/fixture.ts`
- Every test suite includes an axe-core accessibility audit

## CI

GitHub Actions on push/PR to `main`:
1. Install deps + Playwright browsers
2. Run full `npm test` (lint + circular + vitest + coverage)
3. Upload coverage to Codecov
4. PR previews auto-deploy to GitHub Pages at `/pr/{number}/demo/`

## npm Publishing

- `files` in package.json limits published content to `README.md` and `dist/`
- `lit` and `tslib` are externalized (not bundled into dist)
- Minimum version 1.0.0; alphas via `npm version prerelease --preid=ticket`

## Current Branch

`vite` — migrating from Web Dev Server / Web Test Runner to Vite / Vitest and upgrading to ESLint 10 (PR #111).
