# stack.md

# Technical Direction

Crafter Notes is:
- mobile-first
- design-first
- interaction-sensitive
- editor-centric

---

# Core Stack

Recommended:
- Expo
- React Native
- TypeScript
- Expo Router
- Zustand
- SQLite
- Reanimated
- Gesture Handler

---

# Why This Stack

The app needs:
- native-feeling interactions
- tactile motion
- mobile-first UX
- app-store readiness
- strong frontend orchestration
- local-first behavior

---

# Styling

Recommended:
- NativeWind OR StyleSheet system

Choose one and stay consistent.

Prioritize:
- spacing tokens
- typography tokens
- motion tokens
- color tokens
- radius tokens

Avoid arbitrary one-off styling.

---

# Storage

V1:
- SQLite local database

Needed entities:
- entries
- folders
- pinned entries
- quick note draft
- user profile
- settings
- plan state

---

# Suggested Data Model

## Folder
- id
- name
- imageUri optional
- createdAt
- updatedAt

## Entry
- id
- title optional
- body
- folderId optional
- iconId optional
- isPinned
- createdAt
- updatedAt

## QuickNote
- body
- updatedAt
- unsaved state

## UserProfile
- displayName
- email optional
- avatarUri optional

## Stats
Stats can be derived:
- note count
- word count
- folder count
- pinned count

---

# Editor Philosophy

The editor should remain:
- lightweight
- focused
- interruption-free

Avoid:
- Notion complexity
- overbuilt rich text systems
- block overload

V1 editor can be mostly plain text with optional craft sections.

---

# Asset System

Crafter should support a small built-in asset system.

## Pixel Icons

Preferred implementation:
- create icons as SVG components first
- keep icons monochrome
- expose them through a typed icon registry
- allow entries/folders to reference icon IDs

Example icon IDs:
- crafter-default
- cooking-recipe
- preserves-jam
- farming-crops
- flowers-herbal-foraging
- wood-carpentry
- mining-ore
- fishing
- crafting-tools
- textile-yarn
- alchemy-potion
- decor-furniture-diy

## Mascot Sprites

Preferred implementation:
- start with SVG components or small transparent PNG sprites
- keep a typed mascot state registry
- animate with Reanimated using opacity/frame switching or simple transform changes

Example mascot states:
- idle
- writing-01
- writing-02
- writing-03
- waving
- sleepy
- sparkle

## Recommendation

Start with code-based SVG icons for UI clarity.

If pixel-perfect art direction becomes difficult in code, move final assets into external SVG files created in a pixel/vector tool, then import them into the app.

Do not block app development on perfect icon production.

---

# Suggested Architecture

/src
  /app
  /components
  /editor
  /features
    /account
    /entries
    /folders
    /pinned
    /quick-note
    /search
  /stores
  /styles
  /lib
  /hooks
  /assets
    /icons
    /mascot

---

# Screens

- Home
- Full-screen Search
- Full-screen Editor
- Folder Page
- Folder View
- Pinned Board
- Account
- Upgrade

---

# Performance Goals

The app should feel:
- instant
- responsive
- lightweight

Prioritize:
- smooth scrolling
- stable keyboard behavior
- fast startup
- no janky transitions

---

# Payment / Monetization Notes

V1 monetization:
- one-time Plus unlock
- Ko-fi link

If publishing outside app stores first, payment can be external.

When publishing to App Store or Play Store, review platform payment rules before implementation.

---

# Future Possibilities

Potential future additions:
- sync
- AI layer
- OCR parsing
- screenshot extraction
- cloud backup
- import/export
- emoji icon selection
- custom image upload for entry icons

Do NOT prematurely optimize for these.

---

# AI Collaboration Workflow

1. Read vision.md and system.md before implementing
2. Define the narrow task
3. Generate only the requested scope
4. Review visually
5. Remove unnecessary UI
6. Update docs if product decisions change

AI should accelerate implementation, not define the product.

---

# Living Document Rule

This stack evolves with the project.

Update whenever:
- architecture changes
- tooling evolves
- constraints shift
- better patterns emerge
