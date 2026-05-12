/**
 * Motion tokens — restrained, calm, tactile.
 *
 * Most interactions use 140–200ms with ease-out easing.
 * Avoid flashy, bouncy, or elastic animations.
 *
 * These presets work with React Native's Animated API
 * and will map to Reanimated when that dependency is added.
 */
export const motion = {
  /** Quick micro-interactions — press feedback, icon swaps */
  fast: 120,
  /** Standard transitions — screen entrances, element reveals */
  standard: 180,
  /** Slightly longer — sheet presentations, complex reveals */
  slow: 220,
} as const;

/**
 * Easing presets.
 * Values map to Animated.timing easing or Reanimated Easing.
 */
export const easing = {
  /** Default for most interactions — natural deceleration */
  easeOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Subtle entrance — slides, fades */
  easeInOut: [0.76, 0, 0.24, 1] as [number, number, number, number],
} as const;

/**
 * Common animation presets for quick usage.
 * Combine with your animation utility of choice.
 */
export const animations = {
  fadeIn: {
    duration: motion.standard,
    easing: easing.easeOut,
  },
  slideUp: {
    duration: motion.standard,
    easing: easing.easeOut,
  },
  scalePress: {
    duration: motion.fast,
    easing: easing.easeOut,
  },
} as const;

export type MotionToken = keyof typeof motion;
export type AnimationPreset = keyof typeof animations;
