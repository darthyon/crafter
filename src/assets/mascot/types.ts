/**
 * Shared types for the mascot system.
 */
export interface MascotProps {
  /** Mascot width/height in px. Default 32. */
  size?: number;
  /** Stroke/fill color. Default '#111111' (text). */
  color?: string;
  /** Secondary fill color for pixel art details. Defaults to theme tertiary text. */
  secondaryColor?: string;
}
