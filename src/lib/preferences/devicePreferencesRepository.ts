import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PreferencesRepository } from '@/lib/preferences/PreferencesRepository';
import type { ThemePreference } from '@/lib/inMemoryDb';

const THEME_KEY = 'pref.theme';

function isThemePreference(v: unknown): v is ThemePreference {
  return v === 'system' || v === 'light' || v === 'dark';
}

export function createDevicePreferencesRepository(): PreferencesRepository {
  return {
    async getThemePreference(): Promise<ThemePreference> {
      try {
        const stored = await AsyncStorage.getItem(THEME_KEY);
        if (!stored) return 'system';
        return isThemePreference(stored) ? stored : 'system';
      } catch {
        return 'system';
      }
    },

    async setThemePreference(value: ThemePreference): Promise<void> {
      try {
        await AsyncStorage.setItem(THEME_KEY, value);
      } catch {
        // Best-effort; the UI will still update from in-memory store state.
      }
    },
  };
}

