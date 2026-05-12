import { create } from 'zustand';
import type { Entry, QuickNoteDraft } from '@/lib/domain';
import { homeRepo } from '@/lib/home';

type HomeState = {
  isLoading: boolean;
  error?: string;
  quickNoteDraft: QuickNoteDraft;
  pinnedEntries: Entry[];
};

type HomeActions = {
  load: () => Promise<void>;
  setDraft: (body: string) => void;
  saveDraft: () => Promise<void>;
  openPinned: (navigate: (href: any) => void, id: string) => void;
  openFolders: (navigate: (href: any) => void) => void;
  openSearch: (navigate: (href: any) => void) => void;
};

const emptyDraft: QuickNoteDraft = {
  body: '',
  isDirty: false,
  updatedAt: new Date(0).toISOString(),
};

export const useHomeStore = create<HomeState & HomeActions>((set, get) => ({
  isLoading: false,
  error: undefined,
  quickNoteDraft: emptyDraft,
  pinnedEntries: [],

  load: async () => {
    set({ isLoading: true, error: undefined });
    try {
      const snapshot = await homeRepo.getHomeSnapshot();
      set({
        isLoading: false,
        quickNoteDraft: snapshot.quickNoteDraft,
        pinnedEntries: snapshot.pinnedEntries,
      });
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to load',
      });
    }
  },

  setDraft: (body: string) => {
    set((s) => ({
      ...s,
      quickNoteDraft: {
        ...s.quickNoteDraft,
        body,
        isDirty: body.trim().length > 0,
        updatedAt: new Date().toISOString(),
      },
    }));

    void homeRepo.updateQuickNoteDraft(body).catch(() => {
      // No-op: store stays optimistic; load() will re-sync if needed.
    });
  },

  saveDraft: async () => {
    if (get().isLoading) return;
    set({ isLoading: true, error: undefined });
    try {
      const res = await homeRepo.saveQuickNoteAsEntry();
      set({ isLoading: false, quickNoteDraft: res.quickNoteDraft });
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to save',
      });
    }
  },

  openPinned: (navigate, _id) => {
    navigate('/editor');
  },

  openFolders: (navigate) => {
    navigate('/folders');
  },

  openSearch: (navigate) => {
    navigate('/search');
  },
}));
