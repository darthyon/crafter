import Svg, { Path, Circle } from 'react-native-svg';
import { MascotProps } from './types';
import { useColors } from '@/styles/theme';

/**
 * Mascot Idle — a small notebook-like companion resting.
 *
 * A tiny open book with two dot eyes and a soft smile.
 * Suitable for loading screens, empty states, and brand presence.
 *
 * ViewBox is 32x32 for a slightly larger presence than icons (24x24).
 * The mascot should feel like a quiet desk companion, not a character.
 */
export function Idle({ size = 32, color }: MascotProps) {
  const colors = useColors();
  const resolvedColor = color ?? colors.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Notebook body — open book */}
      <Path
        d="M6 8 C6 6 7 5 9 5 L16 5 L16 25 L9 25 C7 25 6 24 6 22 Z"
        stroke={resolvedColor}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M16 5 L23 5 C25 5 26 6 26 8 L26 22 C26 24 25 25 23 25 L16 25 Z"
        stroke={resolvedColor}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* Spine */}
      <Path d="M16 5 L16 25" stroke={resolvedColor} strokeWidth={1.5} />
      {/* Left eye */}
      <Circle cx="12" cy="14" r="1.5" fill={resolvedColor} />
      {/* Right eye */}
      <Circle cx="20" cy="14" r="1.5" fill={resolvedColor} />
      {/* Smile */}
      <Path
        d="M13 19 C14 21 18 21 19 19"
        stroke={resolvedColor}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
