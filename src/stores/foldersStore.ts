import { create } from 'zustand';
import type { EntryId, FolderId } from '@/lib/domain';
import { foldersRepo } from '@/lib/folders';
import type { FolderSummary, RecentEntry } from '@/lib/folders';

type FoldersState = {
  isLoading: boolean;
  error?: string;
  foldersPreview: FolderSummary[];
  hasMoreFolders: boolean;
  recentPreview: RecentEntry[];
  hasMoreRecents: boolean;
};

type FoldersActions = {
  load: () => Promise<void>;
  openFolder: (navigate: (href: any) => void, id: FolderId) => void;
  openAllFolders: (navigate: (href: any) => void) => void;
  openAllRecents: (navigate: (href: any) => void) => void;
  openEntry: (navigate: (href: any) => void, id: EntryId) => void;
};

export const useFoldersStore = create<FoldersState & FoldersActions>((set) => ({
  isLoading: false,
  error: undefined,
  foldersPreview: [],
  hasMoreFolders: false,
  recentPreview: [],
  hasMoreRecents: false,

  load: async () => {
    set({ isLoading: true, error: undefined });
    try {
      const [foldersRes, recentsRes] = await Promise.all([
        foldersRepo.listFolders({ limit: 6 }),
        foldersRepo.listRecentEntries({ limit: 4 }),
      ]);
      set({
        isLoading: false,
        foldersPreview: foldersRes.folders.slice(0, 5),
        hasMoreFolders: foldersRes.folders.length > 5 || foldersRes.nextCursor != null,
        recentPreview: recentsRes.entries.slice(0, 3),
        hasMoreRecents: recentsRes.entries.length > 3 || recentsRes.nextCursor != null,
      });
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

  openAllFolders: (navigate) => {
    navigate('/foldersAll');
  },

  openAllRecents: (navigate) => {
    navigate('/recent');
  },

  openEntry: (navigate, id) => {
    navigate({ pathname: '/editor', params: { mode: 'entry', id } });
  },
}));
