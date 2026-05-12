/**
 * Design tokens — central export point.
 *
 * Import from this file to get all tokens:
 *   import { colors, fonts, spacing, radius, motion } from '@/styles/tokens';
 */
export { colors } from './colors';
export type { ColorToken } from './colors';

export { fonts, fontSizes } from './typography';
export type { FontToken, FontSizeToken } from './typography';

export { spacing } from './spacing';
export type { SpacingToken } from './spacing';

export { radius } from './radius';
export type { RadiusToken } from './radius';

export { motion, easing, animations } from './motion';
export type { MotionToken, AnimationPreset } from './motion';
