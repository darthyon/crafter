import type { PreferencesRepository } from '@/lib/preferences/PreferencesRepository';
import { createDevicePreferencesRepository } from '@/lib/preferences/devicePreferencesRepository';

export const preferencesRepo: PreferencesRepository = createDevicePreferencesRepository();

export type { PreferencesRepository } from '@/lib/preferences/PreferencesRepository';

