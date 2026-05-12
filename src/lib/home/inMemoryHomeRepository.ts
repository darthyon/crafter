import type { Entry, EntryId, QuickNoteDraft } from '@/lib/domain';
import type {
  HomeRepository,
  HomeSnapshot,
  ListPinnedParams,
  ListPinnedResult,
} from '@/lib/home/HomeRepository';
import { createEntryFromDraft, findEntryById, readDb, updateDraft } from '@/lib/inMemoryDb';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withLatency<T>(fn: () => T | Promise<T>): Promise<T> {
  const jitter = 50 + Math.floor(Math.random() * 71); // 50–120ms
  await sleep(jitter);
  return await fn();
}

type InMemoryState = {
  quickNoteDraft: QuickNoteDraft;
  entries: Entry[];
};

export function createInMemoryHomeRepository(): HomeRepository {
  const state: InMemoryState = readDb();

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
        return updateDraft({ body });
      });
    },

    async saveQuickNoteAsEntry(): Promise<{ entry: Entry | null; quickNoteDraft: QuickNoteDraft }> {
      return await withLatency(() => {
        const entry = createEntryFromDraft();
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
      return await withLatency(() => findEntryById(id) ?? null);
    },
  };
}
