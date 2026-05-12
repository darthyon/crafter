/**
 * Typography system — serif display + sans UI.
 *
 * Display (Cormorant Garamond): titles, headings, large text
 * UI (Manrope): body, labels, editor text, metadata
 *
 * Each weight variant is a separate font family name because
 * React Native resolves font files by fontFamily, not by
 * fontWeight + fontFamily together.
 *
 * Swapping to a different font is a one-line change in the
 * values below — no component code needs updating.
 *
 * Usage:
 *   fontFamily: fonts.display                → Cormorant Garamond Regular
 *   fontFamily: fonts.displaySemiBold        → Cormorant Garamond SemiBold
 *   fontFamily: fonts.ui                     → Manrope Regular
 *   fontFamily: fonts.uiSemiBold             → Manrope SemiBold
 *   ...fontSizes.body                        → { fontSize: 16, lineHeight: 24 }
 */

export const fonts = {
  display: 'CormorantGaramond',
  displaySemiBold: 'CormorantGaramond-SemiBold',
  displayBold: 'CormorantGaramond-Bold',
  displayFallback: 'Georgia',
  ui: 'Manrope',
  uiMedium: 'Manrope-Medium',
  uiSemiBold: 'Manrope-SemiBold',
  uiBold: 'Manrope-Bold',
  uiFallback: 'System',
} as const;

export const fontSizes = {
  /** Large display title — used sparingly on Home */
  display: { fontSize: 30, lineHeight: 38 },
  /** Screen titles */
  title: { fontSize: 22, lineHeight: 28 },
  /** Section headings */
  heading: { fontSize: 18, lineHeight: 24 },
  /** Body text — primary reading size */
  body: { fontSize: 16, lineHeight: 24 },
  /** Small body — secondary info */
  bodySmall: { fontSize: 14, lineHeight: 20 },
  /** Captions, metadata, timestamps */
  caption: { fontSize: 12, lineHeight: 16 },
  /** Micro labels — small-caps section labels */
  label: { fontSize: 12, lineHeight: 16 },

  /** Editor title input */
  editorTitle: { fontSize: 32, lineHeight: 40 },
  /** Editor body input (editorial reading size) */
  editorBody: { fontSize: 20, lineHeight: 30 },
} as const;

export type FontToken = keyof typeof fonts;
export type FontSizeToken = keyof typeof fontSizes;
