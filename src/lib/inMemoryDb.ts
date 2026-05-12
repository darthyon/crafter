import type { Entry, EntryId, QuickNoteDraft } from '@/lib/domain';

function nowIso(): string {
  return new Date().toISOString();
}

function seededPinnedEntries(): Entry[] {
  const t = nowIso();
  return [
    {
      id: 'p1',
      iconId: 'crafter-default',
      title: 'Cozy Throw Blanket',
      subtitle: 'Crochet Project',
      body: 'Wool yarn, 6mm hook.\nChain 120. Half double crochet in the back loop…',
      isPinned: true,
      createdAt: t,
      updatedAt: t,
    },
    {
      id: 'p2',
      iconId: 'cooking-recipe',
      title: 'Honey & Apple Jam',
      subtitle: 'Recipe',
      body: '3 cups chopped apples\n3/4 cup honey\nJuice of 1/2 lemon…',
      isPinned: true,
      createdAt: t,
      updatedAt: t,
    },
    {
      id: 'p3',
      iconId: 'farming-crops',
      title: 'Mini Terrarium',
      subtitle: 'DIY',
      body: 'Drainage layer: pebbles\nCharcoal layer\nMoss, soil, small…',
      isPinned: true,
      createdAt: t,
      updatedAt: t,
    },
  ];
}

type InMemoryState = {
  quickNoteDraft: QuickNoteDraft;
  entries: Entry[];
};

const state: InMemoryState = {
  quickNoteDraft: { title: '', body: '', isDirty: false, updatedAt: nowIso() },
  entries: seededPinnedEntries(),
};

export function readDb() {
  return state;
}

export function writeDb(mutator: (db: InMemoryState) => void) {
  mutator(state);
}

export function findEntryById(id: EntryId): Entry | undefined {
  return state.entries.find((e) => e.id === id);
}

export function updateEntryById(id: EntryId, patch: Partial<Pick<Entry, 'title' | 'body' | 'updatedAt'>>): Entry {
  const entry = findEntryById(id);
  if (!entry) {
    throw new Error('Entry not found');
  }
  const updated: Entry = { ...entry, ...patch, updatedAt: patch.updatedAt ?? nowIso() };
  state.entries = state.entries.map((e) => (e.id === id ? updated : e));
  return updated;
}

export function resetDraft(next: Partial<Pick<QuickNoteDraft, 'title' | 'body'>> = {}) {
  const t = nowIso();
  state.quickNoteDraft = {
    title: next.title ?? '',
    body: next.body ?? '',
    isDirty: (next.title ?? '').trim().length > 0 || (next.body ?? '').trim().length > 0,
    updatedAt: t,
  };
}

export function updateDraft(next: Partial<Pick<QuickNoteDraft, 'title' | 'body'>>) {
  const t = nowIso();
  const title = next.title ?? state.quickNoteDraft.title;
  const body = next.body ?? state.quickNoteDraft.body;
  state.quickNoteDraft = {
    title,
    body,
    isDirty: title.trim().length > 0 || body.trim().length > 0,
    updatedAt: t,
  };
  return state.quickNoteDraft;
}

export function createEntryFromDraft(): Entry | null {
  const title = state.quickNoteDraft.title.trim();
  const body = state.quickNoteDraft.body.trim();
  if (!title && !body) return null;

  const t = nowIso();
  const entry: Entry = {
    id: `e_${Math.random().toString(16).slice(2)}`,
    title,
    subtitle: undefined,
    iconId: undefined,
    folderId: undefined,
    body,
    isPinned: false,
    createdAt: t,
    updatedAt: t,
  };
  state.entries.unshift(entry);
  resetDraft();
  return entry;
}
