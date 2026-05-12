import { create } from 'zustand';
import type { EntryId } from '@/lib/domain';
import { editorRepo } from '@/lib/editor';

export type CraftSectionKind = 'Ingredients' | 'Use' | 'Details' | 'Checklist' | 'Tips';

type EditorMode = 'draft' | 'entry';

type EditorState = {
  mode: EditorMode;
  entryId?: EntryId;

  title: string;
  body: string;
  isDirty: boolean;

  isLoading: boolean;
  error?: string;

  confirmDiscardOpen: boolean;
  pendingDiscardAction?: (() => void) | undefined;
};

type EditorActions = {
  loadDraft: () => Promise<void>;
  loadEntry: (id: EntryId) => Promise<void>;

  setTitle: (title: string) => void;
  setBody: (body: string) => void;

  insertCraftSection: (kind: CraftSectionKind) => { inserted: boolean; index?: number };

  saveAndClose: (opts: { navigateBack: () => void }) => Promise<void>;
  requestClose: (opts: { onDiscard: () => void }) => void;
  discardAndClose: () => void;
  cancelDiscard: () => void;
};

function normalizeHeading(kind: CraftSectionKind) {
  return kind;
}

function findHeadingIndex(body: string, heading: string): number {
  const pattern = new RegExp(`(^|\\n)${heading}\\n`, 'm');
  const match = body.match(pattern);
  if (!match || match.index == null) return -1;
  // `match.index` points at either start or the newline before heading.
  const start = match.index + (match[1] === '\n' ? 1 : 0);
  return start;
}

function insertionFor(kind: CraftSectionKind): string {
  const heading = normalizeHeading(kind);
  const starter = kind === 'Ingredients' || kind === 'Tips' ? '- ' : kind === 'Checklist' ? '☐ ' : '';
  return `\n\n${heading}\n${starter}`;
}

export const useEditorStore = create<EditorState & EditorActions>((set, get) => ({
  mode: 'draft',
  entryId: undefined,

  title: '',
  body: '',
  isDirty: false,

  isLoading: false,
  error: undefined,

  confirmDiscardOpen: false,
  pendingDiscardAction: undefined,

  loadDraft: async () => {
    set({ isLoading: true, error: undefined, mode: 'draft', entryId: undefined });
    try {
      const draft = await editorRepo.getDraft();
      set({
        isLoading: false,
        title: draft.title,
        body: draft.body,
        isDirty: draft.isDirty,
      });
    } catch (err) {
      set({ isLoading: false, error: err instanceof Error ? err.message : 'Failed to load draft' });
    }
  },

  loadEntry: async (id: EntryId) => {
    set({ isLoading: true, error: undefined, mode: 'entry', entryId: id });
    try {
      const entry = await editorRepo.getEntryById(id);
      if (!entry) {
        set({ isLoading: false, error: 'Entry not found' });
        return;
      }
      set({
        isLoading: false,
        title: entry.title,
        body: entry.body,
        isDirty: false,
      });
    } catch (err) {
      set({ isLoading: false, error: err instanceof Error ? err.message : 'Failed to load entry' });
    }
  },

  setTitle: (title: string) => {
    const { mode, entryId } = get();
    set((s) => ({ ...s, title, isDirty: true }));
    if (mode === 'draft') {
      void editorRepo.updateDraft({ title }).catch(() => {});
      return;
    }
    if (mode === 'entry' && entryId) {
      void editorRepo.updateEntry(entryId, { title }).catch(() => {});
    }
  },

  setBody: (body: string) => {
    const { mode, entryId } = get();
    set((s) => ({ ...s, body, isDirty: true }));
    if (mode === 'draft') {
      void editorRepo.updateDraft({ body }).catch(() => {});
      return;
    }
    if (mode === 'entry' && entryId) {
      void editorRepo.updateEntry(entryId, { body }).catch(() => {});
    }
  },

  insertCraftSection: (kind: CraftSectionKind) => {
    const heading = normalizeHeading(kind);
    const current = get().body;
    const existingIndex = findHeadingIndex(current, heading);
    if (existingIndex >= 0) {
      return { inserted: false, index: existingIndex };
    }
    const nextBody = current.replace(/\s*$/, '') + insertionFor(kind);
    get().setBody(nextBody);
    return { inserted: true, index: nextBody.length };
  },

  saveAndClose: async ({ navigateBack }) => {
    const { isLoading, mode, entryId, title, body, isDirty } = get();
    if (isLoading) return;
    if (!isDirty) {
      navigateBack();
      return;
    }

    set({ isLoading: true, error: undefined });
    try {
      if (mode === 'draft') {
        await editorRepo.updateDraft({ title, body });
        await editorRepo.saveDraftAsEntry();
      } else if (mode === 'entry' && entryId) {
        await editorRepo.updateEntry(entryId, { title, body });
      }
      set({ isLoading: false, isDirty: false });
      navigateBack();
    } catch (err) {
      set({ isLoading: false, error: err instanceof Error ? err.message : 'Failed to save' });
    }
  },

  requestClose: ({ onDiscard }) => {
    if (!get().isDirty) {
      onDiscard();
      return;
    }
    set({ confirmDiscardOpen: true, pendingDiscardAction: onDiscard });
  },

  discardAndClose: () => {
    const { mode } = get();
    const fn = get().pendingDiscardAction;
    set({ confirmDiscardOpen: false, pendingDiscardAction: undefined, isDirty: false });
    if (mode === 'draft') {
      void editorRepo.resetDraft().catch(() => {});
    }
    fn?.();
  },

  cancelDiscard: () => {
    set({ confirmDiscardOpen: false, pendingDiscardAction: undefined });
  },
}));
