import { create } from 'zustand';
import type { FolderId } from '@/lib/domain';
import { foldersRepo } from '@/lib/folders';
import type { FolderSummary } from '@/lib/folders';

type FoldersAllState = {
  isLoading: boolean;
  error?: string;
  folders: FolderSummary[];
};

type FoldersAllActions = {
  load: () => Promise<void>;
  openFolder: (navigate: (href: any) => void, id: FolderId) => void;
};

export const useFoldersAllStore = create<FoldersAllState & FoldersAllActions>((set) => ({
  isLoading: false,
  error: undefined,
  folders: [],

  load: async () => {
    set({ isLoading: true, error: undefined });
    try {
      const res = await foldersRepo.listFolders({ limit: 50 });
      set({ isLoading: false, folders: res.folders });
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to load folders',
      });
    }
  },

  openFolder: (navigate, id) => {
    navigate({ pathname: '/folder', params: { id } });
  },
}));

