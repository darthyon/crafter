/**
 * Border radius scale.
 *
 * Keeps the interface soft without being bubbly.
 * Cards and containers use lg (16); inputs use md (12); pills use 'full'.
 */
export const radius = {
  /** Small UI elements — badges, tags */
  sm: 8,
  /** Inputs, buttons, cards */
  md: 12,
  /** Large cards, modals, sheets */
  lg: 16,
  /** Pills, avatars, circular elements */
  full: 9999,
} as const;

export type RadiusToken = keyof typeof radius;
