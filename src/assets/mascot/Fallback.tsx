import Svg, { Circle } from 'react-native-svg';
import { MascotProps } from './types';
import { useColors } from '@/styles/theme';

/**
 * Fallback mascot — a single small dot.
 *
 * Rendered when a mascot state isn't implemented yet.
 * All states in the registry resolve to a real component or this.
 */
export function Fallback({ size = 32, color }: MascotProps) {
  const colors = useColors();
  const resolvedColor = color ?? colors.textTertiary;
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Circle cx="16" cy="16" r="3" fill={resolvedColor} />
    </Svg>
  );
}
