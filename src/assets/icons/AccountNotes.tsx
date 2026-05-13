import Svg, { Rect } from 'react-native-svg';
import type { IconProps } from './types';
import { useColors } from '@/styles/theme';

const P = [
  // Outer page
  { x: 6, y: 4, w: 12, h: 2 },
  { x: 6, y: 6, w: 2, h: 14 },
  { x: 16, y: 6, w: 2, h: 14 },
  { x: 6, y: 20, w: 12, h: 2 },
  // Binding dots
  { x: 8, y: 7, w: 1, h: 1 },
  { x: 8, y: 10, w: 1, h: 1 },
  { x: 8, y: 13, w: 1, h: 1 },
  { x: 8, y: 16, w: 1, h: 1 },
  // Writing lines
  { x: 10, y: 9, w: 6, h: 1 },
  { x: 10, y: 12, w: 6, h: 1 },
  { x: 10, y: 15, w: 4, h: 1 },
] as const;

export function AccountNotes({ size = 24, color }: IconProps) {
  const colors = useColors();
  const ink = color ?? colors.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {P.map((p, idx) => (
        <Rect key={idx} x={p.x} y={p.y} width={p.w} height={p.h} fill={ink} />
      ))}
    </Svg>
  );
}
