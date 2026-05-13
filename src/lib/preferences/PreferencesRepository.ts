import type { ThemePreference } from '@/lib/inMemoryDb';

export interface PreferencesRepository {
  getThemePreference(): Promise<ThemePreference>;
  setThemePreference(value: ThemePreference): Promise<void>;
}

