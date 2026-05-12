# Crafter Notes — Design System Notes (v1)

This document exists to keep the interface calm, consistent, and intentionally crafted while the product evolves.

## Workflow guardrails (must-follow)

These guardrails exist to prevent drift. If something conflicts with this workflow, follow the workflow and update the design system or primitives first.

### 1) Source of truth (per screen)
- Every screen must have a matching PNG mock in `ui screens and characters/*.png`.
- The PNG is the visual truth. Code must match it before we move on to the next screen.

### 2) Build order (always the same)
Build in this order:
1. **Repo** (`src/lib/**`): async repository interface + in-memory implementation (mock-real, server-shaped).
2. **Store** (`src/stores/**`): screen store consumes repo only (no fixture imports in UI).
3. **Screen** (`app/**`): screen reads from store and renders UI.

Rule: **Screens never import fixtures directly**. If you need data, add it to the repo and expose it through the store.

### 3) UI composition rules (hard)
- Screens compose only primitives from `src/components/primitives/*`.
- No raw React Native `Text`, `Pressable`, or touchables in `app/**` screens. Lint must fail if this happens.
- No hardcoded colors/spacing/font weights in screens. Use:
  - Tokens (`src/styles/tokens.ts`)
  - Theme colors (`src/styles/theme.tsx`, `src/styles/themes.ts`)
  - Text variants (`src/components/primitives/Text.tsx`)

Rule of thumb: if a screen needs a new UI shape, **add/extend a primitive**. Do not create a one-off pattern in a screen.

### 4) A11y + interaction rules (encoded in primitives)
- Minimum tap target: **44x44** (via padding or explicit size).
- Icon-only actions must have `accessibilityLabel` (and `accessibilityHint` when useful).
- Every interactive element must have visible pressed/disabled feedback (opacity is fine).

### 5) Contrast rule (WCAG)
- Any time you add a new text role, placeholder usage, or change theme colors, run:
  - `node scripts/contrast-check.mjs`
- Placeholder and tertiary text must remain WCAG AA against the current background for the sizes used.

### 6) When you need something new
- New UI pattern → add/extend a primitive in `src/components/primitives/*`.
- New data requirement → extend the repo (`src/lib/**`) and store (`src/stores/**`), then consume it in the screen.
- New visual spec → add/update the PNG mock for that screen and keep code aligned.

## Theme and scene
Default to light. Scene: a player in daylight or warm indoor light, phone propped beside a game session, glancing down to jot and return to play quickly. Dark mode can be added later, but should be a deliberate, separately tuned theme.

## Color strategy
Restrained. Tinted neutrals with one accent used sparingly for focus states and primary actions.

### Palette guidance (OKLCH)
- Neutrals: warm paper-leaning background, ink-leaning text, both lightly tinted (avoid pure #000/#fff).
- Accent: one calm, craft-adjacent hue (e.g. muted moss, clay, or indigo) tuned for accessibility.
- Avoid high chroma at extremes of lightness; keep saturation modest.

## Typography
Editorial, legible, and quiet.
- Prefer a humanist sans or soft grotesk for UI; optional serif accent only for rare brand moments.
- Maintain clear hierarchy through scale and weight contrasts.
- Keep line length comfortable for reading in longer notes; avoid overly wide text blocks.

## Spacing and rhythm
- Use a small, consistent spacing scale (e.g. 4/8/12/16/24/32).
- Vary spacing intentionally to create rhythm; avoid “same padding everywhere”.

## Radius and elevation
- Small radius for most surfaces; slightly larger for writing surfaces.
- Keep shadows subtle and rare. Prefer separation via spacing and background tints over heavy elevation.

## Layout principles
- Home: session surfaces first (Quick Note + pinned preview), no recents.
- Avoid card-grid templates. Use cards only where they improve scanning and tap targets.
- Avoid nested cards.

## Components (behavioral expectations)
### Quick Note surface
- Must feel like a writing canvas.
- Show unsaved state clearly.
- Expand should feel like the same note breathing wider, not a separate mode.

### Pinned preview cards
- Compact, fixed preview.
- No nested scrolling.
- Prefer text-first previews; keep images minimal.

### Search
- Full-screen retrieval mode, calm rows, strong keyboard behavior.

### Folder rows
- Small square thumbnail (40–44), rounded corners, object-cover.
- No large covers or banners.

## Motion
- Purposeful, minimal, tactile.
- Avoid animating layout properties.
- Prefer ease-out curves; no bouncy or elastic motion.

## Iconography and mascot
- Monochrome pixel icons are allowed, but should never turn the app into a game UI.
- Mascot, if present, stays subtle and secondary to writing.

## Copy tone
Short, calm, and literal. No hype. Every word earns its place.
