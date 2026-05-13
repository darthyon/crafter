import { create } from 'zustand';
import type { ThemePreference } from '@/lib/inMemoryDb';
import { preferencesRepo } from '@/lib/preferences';

type PreferencesState = {
  isLoading: boolean;
  themePreference: ThemePreference;
};

type PreferencesActions = {
  load: () => Promise<void>;
  setThemePreference: (value: ThemePreference) => Promise<void>;
};

export const usePreferencesStore = create<PreferencesState & PreferencesActions>((set, get) => ({
  isLoading: false,
  themePreference: 'system',

  load: async () => {
    if (get().isLoading) return;
    set({ isLoading: true });
    try {
      const themePreference = await preferencesRepo.getThemePreference();
      set({ isLoading: false, themePreference });
    } catch {
      set({ isLoading: false, themePreference: 'system' });
    }
  },

  setThemePreference: async (value) => {
    set({ themePreference: value });
    await preferencesRepo.setThemePreference(value);
  },
}));

