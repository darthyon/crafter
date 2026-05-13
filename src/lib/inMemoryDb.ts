import type { Entry, EntryId, Folder, FolderId, QuickNoteDraft } from '@/lib/domain';

function nowIso(): string {
  return new Date().toISOString();
}

export type ThemePreference = 'system' | 'light' | 'dark';

export type AccountProfile = {
  displayName: string;
  email: string;
  bio: string;
};

export type AccountStats = {
  notesWritten: number;
  wordsSaved: number;
  foldersCreated: number;
  pinnedNotes: number;
};

export type AccountPlan = {
  freeLimitNotes: number;
  notesUsed: number;
  plusUnlocked: boolean;
  plusUnlockPriceUsd: number;
};

function seededFolders(): Folder[] {
  const t = nowIso();
  return [
    { id: 'f1', name: 'Stardew Valley', iconId: 'farming-crops', createdAt: t, updatedAt: t },
    { id: 'f2', name: 'Travellers Rest', iconId: 'crafter-default', createdAt: t, updatedAt: t },
    { id: 'f3', name: 'Coral Island', iconId: 'crafter-default', createdAt: t, updatedAt: t },
    { id: 'f4', name: 'Personal Recipes', iconId: 'cooking-recipe', createdAt: t, updatedAt: t },
    { id: 'f5', name: 'Ideas', iconId: 'crafter-default', createdAt: t, updatedAt: t },
    { id: 'f6', name: 'Field Notes', iconId: 'crafter-default', createdAt: t, updatedAt: t },
  ];
}

function isoHoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

function seededEntries(folderIds: Record<string, FolderId>): Entry[] {
  return [
    {
      id: 'p1',
      iconId: 'crafter-default',
      title: 'Cozy Throw Blanket',
      subtitle: 'Crochet Project',
      body: 'Wool yarn, 6mm hook.\nChain 120. Half double crochet in the back loop…',
      folderId: folderIds.personal,
      isPinned: true,
      createdAt: isoDaysAgo(2),
      updatedAt: isoHoursAgo(1),
    },
    {
      id: 'p2',
      iconId: 'cooking-recipe',
      title: 'Honey & Apple Jam',
      subtitle: 'Recipe',
      body: '3 cups chopped apples\n3/4 cup honey\nJuice of 1/2 lemon…',
      folderId: folderIds.personal,
      isPinned: true,
      createdAt: isoDaysAgo(3),
      updatedAt: isoHoursAgo(3),
    },
    {
      id: 'p3',
      iconId: 'farming-crops',
      title: 'Mini Terrarium',
      subtitle: 'DIY',
      body: 'Drainage layer: pebbles\nCharcoal layer\nMoss, soil, small…',
      folderId: folderIds.ideas,
      isPinned: true,
      createdAt: isoDaysAgo(5),
      updatedAt: isoDaysAgo(1),
    },
    {
      id: 'p4',
      iconId: 'crafter-default',
      title: 'Granny Square Blanket',
      subtitle: 'Crochet Project',
      body: 'Make 30 squares\nJoin with slip stitch\nBorder: 2 rounds…',
      folderId: folderIds.personal,
      isPinned: true,
      createdAt: isoDaysAgo(6),
      updatedAt: isoDaysAgo(2),
    },
    {
      id: 'p5',
      iconId: 'crafter-default',
      title: 'Mushroom Study',
      subtitle: 'Field Notes',
      body: 'Spore print observations\nCap color, gill type\nHabitat, notes…',
      folderId: folderIds.fieldNotes,
      isPinned: true,
      createdAt: isoDaysAgo(8),
      updatedAt: isoDaysAgo(4),
    },
    {
      id: 'p6',
      iconId: 'crafter-default',
      title: 'Wildflower Embroidery',
      subtitle: 'Embroidery',
      body: 'DMC Thread Palette\nStitch Guide\nBack stitch for stems…',
      folderId: folderIds.ideas,
      isPinned: true,
      createdAt: isoDaysAgo(10),
      updatedAt: isoDaysAgo(7),
    },
    {
      id: 'p7',
      iconId: 'crafter-default',
      title: 'Yarn Stash Tracker',
      subtitle: 'Inventory',
      body: 'Worsted Weight\nNeutrals: 14 skeins\nPastels: 9 skeins…',
      folderId: folderIds.personal,
      isPinned: true,
      createdAt: isoDaysAgo(12),
      updatedAt: isoDaysAgo(9),
    },
    {
      id: 'p8',
      iconId: 'crafter-default',
      title: 'Plant Care Log',
      subtitle: 'Care Log',
      body: 'Water Mon, Wed, Fri\nBright indirect light\nRotate weekly…',
      folderId: folderIds.ideas,
      isPinned: true,
      createdAt: isoDaysAgo(14),
      updatedAt: isoDaysAgo(12),
    },
  ];
}

type InMemoryState = {
  quickNoteDraft: QuickNoteDraft;
  entries: Entry[];
  folders: Folder[];
  account: {
    profile: AccountProfile;
    stats: AccountStats;
    plan: AccountPlan;
  };
  preferences: {
    themePreference: ThemePreference;
  };
};

const state: InMemoryState = {
  quickNoteDraft: { title: '', body: '', isDirty: false, updatedAt: nowIso() },
  folders: [],
  entries: [],
  account: {
    profile: {
      displayName: 'Threadkeeper',
      email: 'threadkeeper@craftor.app',
      bio: 'Making little things, one stitch at a time.',
    },
    stats: {
      notesWritten: 128,
      wordsSaved: 18400,
      foldersCreated: 12,
      pinnedNotes: 3,
    },
    plan: {
      freeLimitNotes: 150,
      notesUsed: 128,
      plusUnlocked: false,
      plusUnlockPriceUsd: 5,
    },
  },
  preferences: {
    themePreference: 'system',
  },
};

// Initialize with stable references for repo consumers (in-memory).
state.folders = seededFolders();
state.entries = seededEntries({
  personal: state.folders.find((f) => f.id === 'f4')!.id,
  ideas: state.folders.find((f) => f.id === 'f5')!.id,
  fieldNotes: state.folders.find((f) => f.id === 'f6')!.id,
});

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
