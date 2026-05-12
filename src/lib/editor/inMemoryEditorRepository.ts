import type { Entry, EntryId, QuickNoteDraft } from '@/lib/domain';
import type { EditorRepository } from '@/lib/editor/EditorRepository';
import {
  createEntryFromDraft,
  findEntryById,
  readDb,
  resetDraft,
  updateDraft,
  updateEntryById,
} from '@/lib/inMemoryDb';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withLatency<T>(fn: () => T | Promise<T>): Promise<T> {
  const jitter = 50 + Math.floor(Math.random() * 71); // 50–120ms
  await sleep(jitter);
  return await fn();
}

export function createInMemoryEditorRepository(): EditorRepository {
  const db = readDb();

  return {
    async getDraft(): Promise<QuickNoteDraft> {
      return await withLatency(() => db.quickNoteDraft);
    },

    async updateDraft(patch: { title?: string; body?: string }): Promise<QuickNoteDraft> {
      return await withLatency(() => updateDraft(patch));
    },

    async resetDraft(): Promise<QuickNoteDraft> {
      return await withLatency(() => {
        resetDraft();
        return db.quickNoteDraft;
      });
    },

    async saveDraftAsEntry(): Promise<{ entry: Entry | null; quickNoteDraft: QuickNoteDraft }> {
      return await withLatency(() => {
        const entry = createEntryFromDraft();
        return { entry, quickNoteDraft: db.quickNoteDraft };
      });
    },

    async getEntryById(id: EntryId): Promise<Entry | null> {
      return await withLatency(() => findEntryById(id) ?? null);
    },

    async updateEntry(id: EntryId, patch: { title?: string; body?: string }): Promise<Entry> {
      return await withLatency(() => updateEntryById(id, patch));
    },
  };
}
