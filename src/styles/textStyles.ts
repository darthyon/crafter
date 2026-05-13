/**
 * Text role styles — use these instead of assembling ad-hoc
 * font + size + color combinations in screens.
 *
 * Keeps typography + color language deliberate and consistent.
 */

import type { ThemeColors } from '@/styles/themes';
import { fonts, fontSizes } from './tokens';

export function getTextStyle(variant: string, colors: ThemeColors) {
  switch (variant) {
    case 'brandTitle':
      return { fontFamily: fonts.displaySemiBold, ...fontSizes.display, color: colors.text };
    case 'sectionLabel':
      return {
        fontFamily: fonts.uiSemiBold,
        ...fontSizes.label,
        letterSpacing: 2.5,
        color: colors.textSecondary,
      };
    case 'action':
      return { fontFamily: fonts.uiMedium, ...fontSizes.bodySmall, color: colors.textSecondary };
    case 'body':
      return { fontFamily: fonts.ui, ...fontSizes.body, color: colors.text };
    case 'bodyMuted':
      return { fontFamily: fonts.ui, ...fontSizes.body, color: colors.textTertiary };
    case 'placeholder':
      return { fontFamily: fonts.ui, ...fontSizes.body, color: colors.textPlaceholder };
    case 'cardTitle':
      return { fontFamily: fonts.displaySemiBold, ...fontSizes.heading, color: colors.text };
    case 'cardSubtitle':
      return { fontFamily: fonts.ui, ...fontSizes.bodySmall, color: colors.textSecondary };
    case 'cardBody':
      return {
        fontFamily: fonts.ui,
        ...fontSizes.bodySmall,
        lineHeight: 22,
        color: colors.textTertiary,
      };
    case 'accountName':
      return { fontFamily: fonts.displaySemiBold, ...fontSizes.accountName, color: colors.text };
    case 'accountCardTitle':
      return { fontFamily: fonts.displaySemiBold, ...fontSizes.title, color: colors.text };
    case 'statNumber':
      return { fontFamily: fonts.displaySemiBold, ...fontSizes.statNumber, color: colors.text };
    case 'statLabel':
      return { fontFamily: fonts.ui, ...fontSizes.bodySmall, color: colors.textTertiary };
    case 'pillPrice':
      return { fontFamily: fonts.displaySemiBold, ...fontSizes.title, color: colors.text };
    case 'editorBody':
      return { fontFamily: fonts.display, ...fontSizes.editorBody, color: colors.text };
    case 'editorTitle':
      return { fontFamily: fonts.ui, ...fontSizes.editorTitle, color: colors.text };
    default:
      return { fontFamily: fonts.ui, ...fontSizes.body, color: colors.text };
  }
}
