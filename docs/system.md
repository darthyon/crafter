# system.md

# System Philosophy

This document exists to prevent:
- AI slop
- UX drift
- feature accumulation
- visual inconsistency

All implementation work should align with this system.

---

# Current Product Spine

Home = active play  
Quick Note = capture  
Pinned = active context  
Search = retrieval  
Folders = organization  
Editor = focused writing  

---

# Home Rules

Home must stay session-oriented.

Home includes:
- top bar with app title and folder access
- account/avatar access
- search entry point
- Quick Note
- Pinned Notes

Home should NOT include:
- recent entries
- folder lists
- dashboards
- analytics
- gamification

Recents belong in the Folders page.

---

# Quick Note Rules

Quick Note is central to Home.

It should occupy meaningful space, roughly a quarter of the screen depending on device size.

Quick Note behavior:
- user writes directly on Home
- note is temporary until saved
- save button appears when content exists
- expand opens full-screen editor/create mode
- unsaved state must be visible after user writes
- if user attempts destructive action, warn gently

V1 should use manual save, not full autosave.

States:
- Empty
- Unsaved
- Saved
- Expanded

Do not make Quick Note feel like a tiny search input.
It is a writing surface.

---

# Pinned Rules

Pinned notes are active references.

Home shows pinned notes as compact horizontal preview cards:
- two full cards visible
- half of the third card visible
- final card can be “View all”
- top-right “View all” remains available

Pinned Board shows pinned notes as fixed-preview cards.

V1 rule:
- no nested scrolling inside pinned cards
- fixed preview only
- tap opens full note
- long press or ellipsis shows actions
- no large images inside pinned cards

Pinned is not a folder.
Do not show pinned inside the folder list.

---

# Search Rules

Search opens as a full-screen search experience.

Search is a retrieval mode, not an inline filter.

Search should:
- autofocus input
- open keyboard immediately
- show results with calm rows
- prioritize pinned and exact matches

Searches:
- title
- note body
- ingredients
- folders
- tags if available later

---

# Folder Rules

Folders are simple context containers.

Folders should appear as a plain card/list page:
- small square image on the left
- folder title
- entry count
- ellipsis for actions

Folders should NOT include:
- All Notes as a folder item
- Pinned as a folder item
- Unsorted as a folder item
- large image cards
- banners
- decorative folder covers

Home is already the default all-notes context.

---

# Folder Image Rules

Folder images are recognition aids.

They help users identify game worlds quickly.

Image rules:
- optional
- small square thumbnail
- 40x40 or 44x44
- rounded corners
- object-cover
- placed left of the folder title

Do not use:
- large folder hero images
- banner images
- oversized decorative cards

Folder image actions live behind ellipsis:
- Rename
- Change image
- Remove image
- Delete folder

---

# Recent Entries Rules

Recent Entries do not belong on Home.

They belong in the Folders page, below the folder list.

If folder list is long:
- show max 5 folders
- provide “View all”

Then show Recent Entries.

---

# Entry Rules

Every full entry begins as:
- title
- blank canvas

No mandatory fields.

Allowed V1 craft sections:
- Ingredients
- Use
- Details
- Checklist
- Tips

Avoid:
- How to Obtain as a required concept
- Crafting Station as a required concept
- over-specific fields
- table-like forms

---

# Editor Rules

The editor IS the product.

Optimize:
- typing continuity
- low friction
- interruption-free flow
- fast section insertion

Forbidden:
- slash command systems
- block handles
- floating formatting bars
- nested pages
- database builders
- heavy rich text complexity

---

# Pixel Mascot and Icon Rules

Crafter uses a restrained monochrome pixel language for warmth.

The pixel system should feel:
- quiet
- handmade
- lightweight
- functional
- not decorative clutter

## Mascot Rules

The mascot is a small notebook-like companion.

Use mascot sparingly for:
- loading screen
- empty states
- Quick Note writing state
- tiny micro-interactions
- brand mark

Avoid using the mascot as:
- a large illustration system
- a noisy onboarding character
- a gamified achievement system

Mascot states may include:
- idle
- writing
- waving
- sleepy
- sparkle
- tiny hop

Writing sprites should be usable for subtle looping animation.

## Pixel Icon Rules

Built-in icon categories should cover common cozy crafting use cases.

V1 icon categories:
- Crafter / Default
- Cooking / Recipe
- Preserves / Jam
- Farming / Crops
- Flowers / Herbal / Foraging
- Wood / Carpentry
- Mining / Ore
- Fishing
- Crafting / Tools
- Textile / Yarn
- Alchemy / Potion
- Decor / Furniture / DIY

Icon style:
- monochrome
- pixel-outline
- no filled color
- no decorative hearts inside functional icons unless meaningful
- consistent stroke weight
- consistent visual scale
- square-friendly composition

Users may later use:
- system emoji
- uploaded images
- custom icons

Built-in pixel icons are defaults, not a complete taxonomy.

---

# Account Screen Rules

Account is a personal corner, not a SaaS portal.

It includes:
- avatar
- display name
- email
- fun stats
- plan status
- upgrade option
- Ko-fi support
- preferences
- data/export
- about

Avoid:
- enterprise billing feel
- aggressive upgrade prompts
- complex settings

---

# Fun Stats Rules

Stats should be warm and lightweight.

Allowed stats:
- notes written
- words saved
- folders created
- pinned notes
- most used folder

Avoid achievement systems or streaks in V1.

---

# Monetization Rules

Recommended V1 model:
- Free: limited notes
- Plus: one-time $5 early supporter unlock for unlimited notes
- Ko-fi: optional donation link

Prefer total note limit over per-folder limit because it is easier to understand.

Recommended:
- Free: 50 notes total
- Plus: unlimited notes and folders

Subscription should wait until ongoing server-side value exists.

---

# Motion Rules

Most interactions:
- 120ms to 220ms

Use:
- fade
- slight scale
- soft upward motion

Avoid:
- flashy animation
- exaggerated bounce
- elastic interactions

Motion should support orientation, not spectacle.

---

# Visual Rules

Prefer:
- white surfaces
- subtle separators
- restrained typography
- small images only where useful
- monochrome icons

Avoid:
- gradients
- decorative backgrounds
- colorful gaming UI
- heavy cards
- dashboard surfaces

---

# AI Collaboration Rules

AI should assist implementation, not invent product philosophy.

Generate narrowly.
Review aggressively.
Preserve restraint.

When a design or interaction changes, update this file.

---

# Living Document Rule

This file is the canonical guardrail document.

Update it whenever:
- interactions evolve
- patterns stabilize
- inconsistencies appear
- a product decision is made
