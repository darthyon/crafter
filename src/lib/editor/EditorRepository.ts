import type { Entry, EntryId, QuickNoteDraft } from '@/lib/domain';

export interface EditorRepository {
  getDraft(): Promise<QuickNoteDraft>;
  updateDraft(patch: { title?: string; body?: string }): Promise<QuickNoteDraft>;
  resetDraft(): Promise<QuickNoteDraft>;
  saveDraftAsEntry(): Promise<{ entry: Entry | null; quickNoteDraft: QuickNoteDraft }>;

  getEntryById(id: EntryId): Promise<Entry | null>;
  updateEntry(id: EntryId, patch: { title?: string; body?: string }): Promise<Entry>;
}
