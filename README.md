# Crafter Notes

A quiet companion notebook for crafting-heavy experiences — a small workbench beside the game.

Crafter is **writing-first**: quick capture on Home, pinned notes for active context, search for retrieval, and folders for “worlds”.

## What this repo contains

- **Mobile app:** Expo + React Native using `expo-router`
- **Product + design docs:** `docs/*` (vision, product, flows, design system rules)

## Quick start

```bash
npm install
npm run start
```

Common targets:

```bash
npm run ios
npm run android
npm run web
```

## Repo workflow (must-follow)

These guardrails exist to prevent UI drift and keep implementation consistent. This is a summary of `docs/design.md`.

### 1) Source of truth (per screen)
- Every screen must have a matching PNG mock in `ui screens and characters/*.png`.
- The PNG is the visual truth — code must match it before moving on.

### 2) Build order (always the same)
Build in this order:
1. **Repo** (`src/lib/**`): async repository interface + in-memory implementation (mock-real, server-shaped).
2. **Store** (`src/stores/**`): screen store consumes repo only (no fixture imports in UI).
3. **Screen** (`app/**`): screen reads from store and renders UI.

Rule: **Screens never import fixtures directly**. If you need data, add it to the repo and expose it through the store.

### 3) UI composition rules (hard)
- Screens compose only primitives from `src/components/primitives/*`.
- No raw React Native `Text`, `Pressable`, or touchables in `app/**` screens.
- No hardcoded colors/spacing/font weights in screens. Use:
  - Tokens (`src/styles/tokens.ts`)
  - Theme colors (`src/styles/theme.tsx`, `src/styles/themes.ts`)
  - Text variants (`src/components/primitives/Text.tsx`)

Rule of thumb: if a screen needs a new UI shape, **add/extend a primitive** — don’t create one-offs in screens.

### 4) A11y + interaction rules (encoded in primitives)
- Minimum tap target: **44x44**.
- Icon-only actions must have `accessibilityLabel` (and `accessibilityHint` when useful).
- Every interactive element must have visible pressed/disabled feedback.

### 5) Contrast rule (WCAG)
Any time you add a new text role, placeholder usage, or change theme colors, run:

```bash
node scripts/contrast-check.mjs
```

### 6) When you need something new
- New UI pattern → add/extend a primitive in `src/components/primitives/*`.
- New data requirement → extend the repo (`src/lib/**`) and store (`src/stores/**`), then consume it in the screen.
- New visual spec → add/update the PNG mock for that screen and keep code aligned.

## Where to read next

- `docs/vision.md` — product essence and philosophy
- `docs/product.md` — one-liner, users, spine, rules
- `docs/flows.md` — primary user flows
- `docs/design.md` — full design system + workflow guardrails
