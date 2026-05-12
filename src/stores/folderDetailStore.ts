import { create } from 'zustand';
import type { Entry, EntryId, FolderId } from '@/lib/domain';
import type { GetFolderResult } from '@/lib/folders';
import { foldersRepo } from '@/lib/folders';

type FolderDetailState = {
  isLoading: boolean;
  error?: string;
  folder?: GetFolderResult;
  entries: Entry[];
};

type FolderDetailActions = {
  load: (id: FolderId) => Promise<void>;
  openEntry: (navigate: (href: any) => void, id: EntryId) => void;
};

export const useFolderDetailStore = create<FolderDetailState & FolderDetailActions>((set) => ({
  isLoading: false,
  error: undefined,
  folder: undefined,
  entries: [],

  load: async (id) => {
    set({ isLoading: true, error: undefined });
    try {
      const [folder, entriesRes] = await Promise.all([
        foldersRepo.getFolderById(id),
        foldersRepo.listEntriesByFolder({ folderId: id, limit: 50 }),
      ]);

      if (!folder) {
        set({ isLoading: false, error: 'Folder not found', folder: null, entries: [] });
        return;
      }

      set({ isLoading: false, folder, entries: entriesRes.entries });
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to load folder',
      });
    }
  },

  openEntry: (navigate, id) => {
    navigate({ pathname: '/editor', params: { mode: 'entry', id } });
  },
}));

