# Crafter Notes — Product Context

## Register
product

## One-liner
A quiet companion notebook for crafting-heavy experiences: a small workbench beside the game.

## Primary users
- Cozy game players and crafting-focused gamers
- Players juggling multiple save files/worlds
- People using a phone beside a desktop/console/handheld while playing

## Secondary users
- Recipe keepers and hobby crafters
- Gardeners and DIY users

## Core problem
Players learn and discover crafting knowledge mid-session, then lose it. Existing tools push them into rigid systems (forms, databases, dashboards) that feel heavier than the game moment.

## What this is
- Contextual memory layer for crafting
- Writing-first, low-friction capture and retrieval
- Session-oriented home for active play

## What this is not
- Productivity app, task manager, habit tool
- Notion/Obsidian-style system builder
- Game wiki clone, wiki scraper
- Dashboard, analytics, gamified overlay

## Product spine (navigation model)
- Home = active play
- Quick Note = capture
- Pinned = active context
- Search = retrieval mode
- Folders = worlds/contexts
- Editor = focused writing

## Key behaviors and rules
### Home
- Must stay session-oriented
- Contains: title + folder access, account/avatar, search entry point, Quick Note, pinned preview
- Must not contain: recents, folder lists, dashboards, analytics, gamification

### Quick Note
- Primary interaction on Home
- A writing surface, not a tiny input
- Manual save in v1 (not full autosave)
- States: Empty, Unsaved, Saved, Expanded
- Unsaved state must be visible; destructive exits warn gently

### Pinned
- Active references for the current session
- Home shows compact horizontal preview cards (two full cards + half of third)
- No nested scrolling inside pinned cards in v1

### Search
- Full-screen retrieval mode
- Autofocus + keyboard opens immediately
- Prioritize pinned and exact matches

### Folders
- Context containers (worlds), not the homepage
- Simple list rows: image thumbnail, name, entry count, actions
- No “All Notes”, “Pinned”, or “Unsorted” pseudo-folders

## Emotional goal (how it should feel)
Calm, lightweight, tactile, intentional, editorial, quietly useful. The interface disappears behind the user’s thoughts.

## Aesthetic direction (taste)
Closer to editorial layouts, stationery, field notebooks, cafe menus, packaging systems, quiet Japanese/Korean product sensibility. Not startup dashboards, gaming overlays, anime interfaces, or heavy SaaS.

## Personality accents
A tiny monochrome pixel mascot and pixel icons can add warmth, but must remain quiet, functional, and secondary to writing.

## Monetization philosophy (v1)
- Free tier with a reasonable note limit
- Plus: one-time unlock for unlimited notes
- Optional Ko-fi style support
- Avoid subscriptions until there is ongoing value (sync, OCR, cloud backup)

## Strategic principles
1. Quick capture first: the app is opened mid-session, speed matters.
2. Structure emerges: suggest craft sections, never impose them.
3. Calm over clever: fewer surfaces, fewer prompts, fewer visual tricks.
4. Local-first by default: instant, offline-capable, no friction.
5. No UI cosplay: avoid genre tropes that read “gaming UI” or “SaaS UI”.

