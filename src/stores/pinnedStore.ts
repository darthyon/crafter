import { create } from 'zustand';
import type { Entry, EntryId } from '@/lib/domain';
import { homeRepo } from '@/lib/home';

type PinnedState = {
  entries: Entry[];
  isLoading: boolean;
  error?: string;
};

type PinnedActions = {
  load: () => Promise<void>;
  openEntry: (navigate: (href: any) => void, id: EntryId) => void;
};

export const usePinnedStore = create<PinnedState & PinnedActions>((set) => ({
  entries: [],
  isLoading: false,
  error: undefined,

  load: async () => {
    set({ isLoading: true, error: undefined });
    try {
      const res = await homeRepo.listPinned({ limit: 50 });
      set({ isLoading: false, entries: res.entries });
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to load pinned notes',
      });
    }
  },

  openEntry: (navigate, id) => {
    navigate({ pathname: '/editor', params: { mode: 'entry', id } });
  },
}));

