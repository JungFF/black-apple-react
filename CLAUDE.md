# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Early-stage Apple Store clone (Chinese locale) built with React 19 + Vite 7. Plain JavaScript (no TypeScript). Currently has one component, a static data layer with 12 products, and route definitions ready for a router to be wired up.

## Commands

| Task | Command |
|---|---|
| Dev server (port 3000) | `npm run dev` |
| Production build | `npm run build` |
| Preview build | `npm run preview` |
| Lint | `npm run lint` |
| Run all tests | `npm test` |
| Run tests in watch mode | `npm run test:watch` |
| Run a single test file | `npx vitest run src/__tests__/data/products.test.js` |

## Path Aliases (defined in vite.config.js)

| Alias | Resolves to |
|---|---|
| `@` | `src/` |
| `@components` | `src/components/` |
| `~img` | `src/assets/images/` |
| `#types` | `src/types/` |

## Architecture

**Entry point:** `src/main.jsx` exports `App` as a named export (required for testing) and conditionally mounts to `#root` with `if (root)` guard so tests can import `App` without triggering `createRoot`.

**Components** (`src/components/`): Function components using plain `props` object access (not destructured). Currently only `Product.jsx`.

**Data layer** (`src/assets/data/`): All data is static JS objects — no API calls or state management. `products.js` defines 12 product objects; `index.js` composes them into lists (`NEW_ARRIVALS_LIST`, `OFFER_LIST`, `SUGGESTED_PROUDCT`); `path.js` defines route/navigation structure as plain arrays.

**Known data issues:** Duplicate IDs exist (products with id 4 and id 5 appear twice each). `IPHONE_16_PRO.models` uses `specification` key while all others use `spec`.

## Styling Pattern (Hybrid)

- **Styled Components** — for dynamic/animated wrappers with prop-driven styles (e.g., `transition`, `scale` props)
- **CSS Modules** (`.module.css`) — for static positional/typographic styles
- **Global CSS** (`src/main.css`) — resets only

## Testing

- **Vitest** with `globals: true` (no need to import `describe`/`it`/`expect`, though some test files do import them explicitly)
- **@testing-library/react** for rendering, **@testing-library/jest-dom** for DOM matchers
- Tests live in `src/__tests__/` mirroring source structure; files named `*.test.js` or `*.test.jsx`
- Setup file: `src/__tests__/setup.js` (loads jest-dom matchers)
- Integration tests import `App` as a **named** export from `@/main.jsx`

## ESLint

Flat config (v9) in `eslint.config.js`. Custom rule: `no-unused-vars` allows SCREAMING_SNAKE_CASE constants to be declared unused (`varsIgnorePattern: '^[A-Z_]'`).

## Conventions

- Component files: PascalCase (`Product.jsx`)
- Data constants: SCREAMING_SNAKE_CASE (`NEW_ARRIVALS_LIST`, `IPHONE_16_PRO`)
- ESM throughout (`"type": "module"` in package.json)
- Prettier runs with default settings (no `.prettierrc`)

## Keeping Docs Up to Date

After making significant changes (new features, architectural changes, new dependencies, new conventions, or config changes), review and update this file and `README.md` to reflect those changes before committing. Minor fixes and small tweaks do not require doc updates.
