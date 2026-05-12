import { create } from 'zustand';
import type { EntryId } from '@/lib/domain';
import { foldersRepo } from '@/lib/folders';
import type { RecentEntry } from '@/lib/folders';

type RecentState = {
  isLoading: boolean;
  error?: string;
  entries: RecentEntry[];
};

type RecentActions = {
  load: () => Promise<void>;
  openEntry: (navigate: (href: any) => void, id: EntryId) => void;
};

export const useRecentStore = create<RecentState & RecentActions>((set) => ({
  isLoading: false,
  error: undefined,
  entries: [],

  load: async () => {
    set({ isLoading: true, error: undefined });
    try {
      const res = await foldersRepo.listRecentEntries({ limit: 50 });
      set({ isLoading: false, entries: res.entries });
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to load recent entries',
      });
    }
  },

  openEntry: (navigate, id) => {
    navigate({ pathname: '/editor', params: { mode: 'entry', id } });
  },
}));

