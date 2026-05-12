/**
 * Back-compat export.
 *
 * Prefer `useColors()` from `src/styles/theme.tsx` in components.
 * This static export reflects the light theme only.
 */
import { lightTheme } from '@/styles/themes';

export const colors = lightTheme.colors;
export type ColorToken = keyof typeof colors;
