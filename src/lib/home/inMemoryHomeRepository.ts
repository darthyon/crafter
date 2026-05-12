import type { Entry, EntryId, QuickNoteDraft } from '@/lib/domain';
import type {
  HomeRepository,
  HomeSnapshot,
  ListPinnedParams,
  ListPinnedResult,
} from '@/lib/home/HomeRepository';

function nowIso(): string {
  return new Date().toISOString();
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withLatency<T>(fn: () => T | Promise<T>): Promise<T> {
  const jitter = 50 + Math.floor(Math.random() * 71); // 50–120ms
  await sleep(jitter);
  return await fn();
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

function normalizeDraft(body: string): QuickNoteDraft {
  const trimmed = body.trim();
  const t = nowIso();
  return {
    body,
    isDirty: trimmed.length > 0,
    updatedAt: t,
  };
}

export function createInMemoryHomeRepository(): HomeRepository {
  const state: InMemoryState = {
    quickNoteDraft: { body: '', isDirty: false, updatedAt: nowIso() },
    entries: seededPinnedEntries(),
  };

  function pinnedEntries(): Entry[] {
    return state.entries.filter((e) => e.isPinned);
  }

  return {
    async getHomeSnapshot(): Promise<HomeSnapshot> {
      return await withLatency(() => {
        const pinned = pinnedEntries();
        return {
          quickNoteDraft: state.quickNoteDraft,
          pinnedEntries: pinned.slice(0, 3),
          pinnedCount: pinned.length,
        };
      });
    },

    async updateQuickNoteDraft(body: string): Promise<QuickNoteDraft> {
      return await withLatency(() => {
        state.quickNoteDraft = normalizeDraft(body);
        return state.quickNoteDraft;
      });
    },

    async saveQuickNoteAsEntry(): Promise<{ entry: Entry | null; quickNoteDraft: QuickNoteDraft }> {
      return await withLatency(() => {
        const body = state.quickNoteDraft.body.trim();
        if (!body) {
          state.quickNoteDraft = normalizeDraft('');
          return { entry: null, quickNoteDraft: state.quickNoteDraft };
        }

        const t = nowIso();
        const entry: Entry = {
          id: `e_${Math.random().toString(16).slice(2)}`,
          title: '',
          subtitle: undefined,
          iconId: undefined,
          folderId: undefined,
          body,
          isPinned: false,
          createdAt: t,
          updatedAt: t,
        };

        state.entries.unshift(entry);
        state.quickNoteDraft = normalizeDraft('');
        return { entry, quickNoteDraft: state.quickNoteDraft };
      });
    },

    async listPinned(params: ListPinnedParams): Promise<ListPinnedResult> {
      return await withLatency(() => {
        const pinned = pinnedEntries();
        const offset = params.cursor ? Number(params.cursor) || 0 : 0;
        const entries = pinned.slice(offset, offset + params.limit);
        const nextOffset = offset + entries.length;
        const nextCursor = nextOffset < pinned.length ? String(nextOffset) : undefined;
        return { entries, nextCursor };
      });
    },

    async getEntryById(id: EntryId): Promise<Entry | null> {
      return await withLatency(() => state.entries.find((e) => e.id === id) ?? null);
    },
  };
}

