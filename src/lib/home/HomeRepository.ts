import type { Entry, EntryId, QuickNoteDraft } from '@/lib/domain';

export type ListPinnedParams = {
  limit: number;
  cursor?: string;
};

export type ListPinnedResult = {
  entries: Entry[];
  nextCursor?: string;
};

export type HomeSnapshot = {
  quickNoteDraft: QuickNoteDraft;
  pinnedEntries: Entry[];
  pinnedCount: number;
};

export interface HomeRepository {
  getHomeSnapshot(): Promise<HomeSnapshot>;
  updateQuickNoteDraft(body: string): Promise<QuickNoteDraft>;
  saveQuickNoteAsEntry(): Promise<{ entry: Entry | null; quickNoteDraft: QuickNoteDraft }>;
  listPinned(params: ListPinnedParams): Promise<ListPinnedResult>;
  getEntryById(id: EntryId): Promise<Entry | null>;
}

