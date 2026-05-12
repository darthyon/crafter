import Svg, { Rect } from 'react-native-svg';
import { IconProps } from './types';
import { useColors } from '@/styles/theme';

/**
 * Fallback icon — a simple square outline.
 *
 * Rendered when an icon ID doesn't have a real implementation yet.
 * All 12 icon IDs in the registry map to a real component or this.
 */
export function Fallback({ size = 24, color }: IconProps) {
  const colors = useColors();
  const resolvedColor = color ?? colors.textTertiary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="2"
        stroke={resolvedColor}
        strokeWidth={1.5}
      />
    </Svg>
  );
}
