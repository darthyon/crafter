import { create } from 'zustand';
import type { AccountSnapshot } from '@/lib/account';
import { accountRepo } from '@/lib/account';

type AccountState = {
  isLoading: boolean;
  error?: string;
  snapshot?: AccountSnapshot;
};

type AccountActions = {
  load: () => Promise<void>;
  unlockPlus: () => Promise<void>;
};

export const useAccountStore = create<AccountState & AccountActions>((set, get) => ({
  isLoading: false,
  error: undefined,
  snapshot: undefined,

  load: async () => {
    set({ isLoading: true, error: undefined });
    try {
      const snapshot = await accountRepo.getAccountSnapshot();
      set({ isLoading: false, snapshot });
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to load',
      });
    }
  },

  unlockPlus: async () => {
    if (get().isLoading) return;
    set({ isLoading: true, error: undefined });
    try {
      const snapshot = await accountRepo.unlockPlus();
      set({ isLoading: false, snapshot });
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to unlock',
      });
    }
  },
}));

